package middleware

import (
    "net/http"
    "os"
    "time"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
)

var secret = []byte(os.Getenv("JWT_SECRET"))

// 🔐 Generate token with admin_key
func GenerateAdminToken(adminKey int) (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "admin_key": adminKey,
        "exp":       time.Now().Add(30 * time.Hour).Unix(),
    })
    return token.SignedString(secret)
}

// 🔐 Middleware to verify token and extract admin_key
func AdminAuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("Authorization")

        if tokenString == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
            c.Abort()
            return
        }

        claims := jwt.MapClaims{}
        _, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
            return secret, nil
        })

        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
            c.Abort()
            return
        }

        // ✅ Set admin_key into context
        if adminKey, ok := claims["admin_key"]; ok {
            c.Set("admin_key", adminKey)
            c.Next()
        } else {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "admin_key missing in token"})
            c.Abort()
            return
        }
    }
}
