package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Brewed For U backend is running",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {

	// Load environment variables from .env
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Warning: .env file not found")
	}

	// Connect to PostgreSQL
	db, err := connectDB()
	if err != nil {
		fmt.Println("Database connection failed:", err)
		return
	}

	defer db.Close()

	// Get products from database
	products := getProducts(db)
	fmt.Println("Products:", products)

	// API routes
	http.HandleFunc("GET /api/health", healthHandler)

	// Public menu API
	http.HandleFunc("/api/products", productsHandler(db))

	// Protected orders API
	http.Handle(
		"/api/orders",
		authMiddleware(http.HandlerFunc(ordersHandler(db))),
	)

	// Authentication APIs
	http.HandleFunc("/api/signup", signupHandler(db))
	http.HandleFunc("/api/login", loginHandler(db))

	// Get port from environment variable
	port := os.Getenv("PORT")

	// Use port 8080 when running locally
	if port == "" {
		port = "8080"
	}

	fmt.Println("Brewed For U backend is running on http://localhost:" + port)

	// Start server
	err = http.ListenAndServe(":"+port, nil)
	if err != nil {
		fmt.Println(err)
	}
}