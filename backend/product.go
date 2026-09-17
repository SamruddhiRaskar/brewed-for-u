package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	ImageURL    string  `json:"image_url"`
	Category    string  `json:"category"`
}

func getProducts(db *sql.DB) []Product {
	rows, err := db.Query(`
		SELECT id, name, description, price, image_url, category
		FROM products
	`)
	if err != nil {
		fmt.Println("Query failed:", err)
		return nil
	}
	defer rows.Close()

	var products []Product

	for rows.Next() {
		var product Product

		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.ImageURL,
			&product.Category,
		)

		if err != nil {
			fmt.Println("Scan failed:", err)
			return nil
		}

		products = append(products, product)
	}

	return products
}
func productsHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		products := getProducts(db)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(products)
	}
}
func getProductPrice(db *sql.DB, productID string) (float64, error) {
	var price float64

	err := db.QueryRow(`
		SELECT price
		FROM products
		WHERE id = $1
	`, productID).Scan(&price)

	return price, err
}
