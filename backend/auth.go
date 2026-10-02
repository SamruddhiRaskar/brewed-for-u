package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
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

		// Hash password before storing it
		hashedPassword, err := bcrypt.GenerateFromPassword(
			[]byte(request.Password),
			bcrypt.DefaultCost,
		)

		if err != nil {
			http.Error(w, "Failed to secure password", http.StatusInternalServerError)
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
			string(hashedPassword),
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
		var email string
		var hashedPassword string

		err = db.QueryRow(`
			SELECT id, name, email, password
			FROM users
			WHERE email = $1
		`,
			request.Email,
		).Scan(&userID, &name, &email, &hashedPassword)

		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Compare entered password with stored bcrypt hash
		err = bcrypt.CompareHashAndPassword(
			[]byte(hashedPassword),
			[]byte(request.Password),
		)

		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Get JWT secret from environment variable
		secret := os.Getenv("JWT_SECRET")

		if secret == "" {
			http.Error(w, "JWT secret is not configured", http.StatusInternalServerError)
			return
		}

		// Create JWT token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": userID,
			"email":   email,
		})

		// Sign the JWT
		signedToken, err := token.SignedString([]byte(secret))

		if err != nil {
			http.Error(w, "Failed to create token", http.StatusInternalServerError)
			return
		}

		// Login successful
		response := map[string]string{
			"id":      userID,
			"name":    name,
			"email":   email,
			"token":   signedToken,
			"message": "Login successful",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
