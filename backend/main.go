package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Brewed For U backend is running",
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(response)
}

func main() {

	// Connect to PostgreSQL
	db, err := connectDB()
	if err != nil {
		fmt.Println("Database connection failed:", err)
		return
	}
	defer db.Close()
	products := getProducts(db)
	fmt.Println("Products:", products)

	http.HandleFunc("GET /api/health", healthHandler)
	http.HandleFunc("GET /api/products", productsHandler(db))
	http.HandleFunc("/api/orders", ordersHandler(db))
	http.HandleFunc("/api/signup", signupHandler(db))
	http.HandleFunc("/api/login", loginHandler(db))
	fmt.Println("Brewed For U backend is running on http://localhost:8080")

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}
}
