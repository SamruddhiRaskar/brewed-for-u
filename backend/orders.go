package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
)

type Order struct {
	ID            string  `json:"id"`
	OrderNumber   string  `json:"order_number"`
	TotalAmount   float64 `json:"total_amount"`
	PaymentMethod string  `json:"payment_method"`
	Status        string  `json:"status"`
}

type OrderItem struct {
	ProductID string  `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type CreateOrderRequest struct {
	PaymentMethod string      `json:"payment_method"`
	Items         []OrderItem `json:"items"`
}

func generateOrderNumber() string {
	number := rand.Intn(900000) + 100000
	return fmt.Sprintf("BFU-%d", number)
}

func ordersHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// CORS
		w.Header().Set(
			"Access-Control-Allow-Origin",
			"http://localhost:5173",
		)

		w.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization",
		)

		w.Header().Set(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS",
		)

		// Handle browser CORS preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Get authenticated user ID from JWT middleware
		userID, ok := r.Context().Value("userID").(string)
		if !ok || userID == "" {
			http.Error(
				w,
				"User authentication required",
				http.StatusUnauthorized,
			)
			return
		}

		// =========================================================
		// GET /api/orders
		// Get orders belonging to the logged-in user
		// =========================================================

		if r.Method == http.MethodGet {

			rows, err := db.Query(`
				SELECT
					id,
					order_number,
					total_amount,
					payment_method,
					status
				FROM orders
				WHERE user_id = $1
				ORDER BY created_at DESC
			`, userID)

			if err != nil {
				fmt.Println("Failed to get orders:", err)

				http.Error(
					w,
					"Failed to get orders",
					http.StatusInternalServerError,
				)
				return
			}

			defer rows.Close()

			orders := []Order{}

			for rows.Next() {

				var order Order

				err := rows.Scan(
					&order.ID,
					&order.OrderNumber,
					&order.TotalAmount,
					&order.PaymentMethod,
					&order.Status,
				)

				if err != nil {
					fmt.Println("Failed to read order:", err)

					http.Error(
						w,
						"Failed to read orders",
						http.StatusInternalServerError,
					)
					return
				}

				orders = append(orders, order)
			}

			if err := rows.Err(); err != nil {
				fmt.Println("Rows error:", err)

				http.Error(
					w,
					"Failed to read orders",
					http.StatusInternalServerError,
				)
				return
			}

			w.Header().Set(
				"Content-Type",
				"application/json",
			)

			json.NewEncoder(w).Encode(orders)

			return
		}

		// =========================================================
		// POST /api/orders
		// Create a new order
		// =========================================================

		if r.Method != http.MethodPost {
			http.Error(
				w,
				"Method not allowed",
				http.StatusMethodNotAllowed,
			)
			return
		}

		// Read request body
		var request CreateOrderRequest

		err := json.NewDecoder(r.Body).Decode(&request)

		if err != nil {
			http.Error(
				w,
				"Invalid request body",
				http.StatusBadRequest,
			)
			return
		}

		// Validate payment method
		if request.PaymentMethod == "" {
			http.Error(
				w,
				"Payment method is required",
				http.StatusBadRequest,
			)
			return
		}

		// Validate order items
		if len(request.Items) == 0 {
			http.Error(
				w,
				"Order must contain at least one item",
				http.StatusBadRequest,
			)
			return
		}

		// Start database transaction
		tx, err := db.Begin()

		if err != nil {
			fmt.Println("Failed to start transaction:", err)

			http.Error(
				w,
				"Failed to start transaction",
				http.StatusInternalServerError,
			)
			return
		}

		// If something fails before Commit(),
		// the transaction will be rolled back.
		defer tx.Rollback()

		total := 0.0

		// We store the real prices retrieved from PostgreSQL.
		// We do NOT trust prices sent by React.
		type itemWithPrice struct {
			ProductID string
			Quantity  int
			Price     float64
		}

		var items []itemWithPrice

		// Get product prices and calculate total
		for _, item := range request.Items {

			// Quantity must be greater than zero
			if item.Quantity <= 0 {
				http.Error(
					w,
					"Quantity must be greater than 0",
					http.StatusBadRequest,
				)
				return
			}

			var price float64

			err := tx.QueryRow(`
				SELECT price
				FROM products
				WHERE id = $1
			`, item.ProductID).Scan(&price)

			if err != nil {
				fmt.Println("Product not found:", err)

				http.Error(
					w,
					"Product not found",
					http.StatusBadRequest,
				)
				return
			}

			// Calculate total using database price
			total += price * float64(item.Quantity)

			// Save product information for order_items
			items = append(items, itemWithPrice{
				ProductID: item.ProductID,
				Quantity:  item.Quantity,
				Price:     price,
			})
		}

		// Create order object
		order := Order{
			OrderNumber:   generateOrderNumber(),
			TotalAmount:   total,
			PaymentMethod: request.PaymentMethod,
			Status:        "pending",
		}

		// Insert order into database
		// The order is associated with the authenticated user.
		err = tx.QueryRow(`
			INSERT INTO orders (
				order_number,
				total_amount,
				payment_method,
				status,
				user_id
			)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id
		`,
			order.OrderNumber,
			order.TotalAmount,
			order.PaymentMethod,
			order.Status,
			userID,
		).Scan(&order.ID)

		if err != nil {
			fmt.Println("Create order failed:", err)

			http.Error(
				w,
				"Failed to create order",
				http.StatusInternalServerError,
			)
			return
		}

		fmt.Println("Order ID from database:", order.ID)
		fmt.Println("Order belongs to user:", userID)

		// Insert order items
		for _, item := range items {

			_, err = tx.Exec(`
				INSERT INTO order_items (
					order_id,
					product_id,
					quantity,
					price
				)
				VALUES ($1, $2, $3, $4)
			`,
				order.ID,
				item.ProductID,
				item.Quantity,
				item.Price,
			)

			if err != nil {
				fmt.Println("Create order item failed:", err)

				http.Error(
					w,
					"Failed to create order item",
					http.StatusInternalServerError,
				)
				return
			}
		}

		// Everything succeeded.
		// Permanently save the transaction.
		err = tx.Commit()

		if err != nil {
			fmt.Println("Commit failed:", err)

			http.Error(
				w,
				"Failed to save order",
				http.StatusInternalServerError,
			)
			return
		}

		// Send order back to React
		w.Header().Set(
			"Content-Type",
			"application/json",
		)

		json.NewEncoder(w).Encode(order)
	}
}