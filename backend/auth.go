package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

type SignupRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func signupHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// CORS
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

		// Handle browser CORS preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Only allow POST
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Read JSON sent by React
		var request SignupRequest

		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Basic validation
		if request.Name == "" ||
			request.Email == "" ||
			request.Password == "" {
			http.Error(w, "All fields are required", http.StatusBadRequest)
			return
		}

		// Insert user into PostgreSQL
		var userID string

		err = db.QueryRow(`
			INSERT INTO users (name, email, password)
			VALUES ($1, $2, $3)
			RETURNING id
		`,
			request.Name,
			request.Email,
			request.Password,
		).Scan(&userID)

		if err != nil {
			http.Error(w, "Failed to create user", http.StatusInternalServerError)
			return
		}

		// Send response back to React
		response := map[string]string{
			"id":      userID,
			"name":    request.Name,
			"email":   request.Email,
			"message": "Account created successfully",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func loginHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// CORS
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

		// Handle browser CORS preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Only allow POST
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Read JSON sent by React
		var request LoginRequest

		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Basic validation
		if request.Email == "" || request.Password == "" {
			http.Error(w, "Email and password are required", http.StatusBadRequest)
			return
		}

		// Find user in PostgreSQL
		var userID string
		var name string
		var password string

		err = db.QueryRow(`
			SELECT id, name, password
			FROM users
			WHERE email = $1
		`,
			request.Email,
		).Scan(&userID, &name, &password)

		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Check password
		if request.Password != password {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Login successful
		response := map[string]string{
			"id":      userID,
			"name":    name,
			"email":   request.Email,
			"message": "Login successful",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}