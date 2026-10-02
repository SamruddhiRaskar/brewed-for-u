package main

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// CORS headers
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

		// Allow browser preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Get Authorization header
		authHeader := r.Header.Get("Authorization")

		if authHeader == "" {
			http.Error(
				w,
				"Authorization header required",
				http.StatusUnauthorized,
			)
			return
		}

		// Expected:
		// Authorization: Bearer <token>
		parts := strings.SplitN(authHeader, " ", 2)

		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(
				w,
				"Invalid Authorization header",
				http.StatusUnauthorized,
			)
			return
		}

		tokenString := parts[1]

		// Get JWT secret
		secret := os.Getenv("JWT_SECRET")

		if secret == "" {
			http.Error(
				w,
				"JWT secret is not configured",
				http.StatusInternalServerError,
			)
			return
		}

		// Parse and verify JWT
		token, err := jwt.Parse(
			tokenString,
			func(token *jwt.Token) (interface{}, error) {

				// Make sure the token uses an HMAC signing method
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, jwt.ErrTokenSignatureInvalid
				}

				return []byte(secret), nil
			},
		)

		if err != nil || !token.Valid {

			// TEMPORARY DEBUG MESSAGE
			println("JWT ERROR:", err)

			http.Error(
				w,
				"Invalid or expired token",
				http.StatusUnauthorized,
			)
			return
		}

		// Get claims from the valid JWT
		claims, ok := token.Claims.(jwt.MapClaims)

		if !ok {
			http.Error(
				w,
				"Invalid token claims",
				http.StatusUnauthorized,
			)
			return
		}

		// Get user ID from JWT
		userID, ok := claims["user_id"].(string)

		if !ok || userID == "" {
			http.Error(
				w,
				"User ID missing from token",
				http.StatusUnauthorized,
			)
			return
		}

		// Store user ID in request context
		ctx := context.WithValue(
			r.Context(),
			"userID",
			userID,
		)

		// Continue request with updated context
		next.ServeHTTP(
			w,
			r.WithContext(ctx),
		)
	})
}