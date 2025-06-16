package middleware

import (
    "net/http"
    "os"
    "time"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
)

var secret = []byte(os.Getenv("JWT_SECRET"))

func GenerateToken(passengerID uint) (string, error) {
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "passenger_id": passengerID,
        "exp":          time.Now().Add(time.Hour * 30).Unix(),
    })

    return token.SignedString(secret)
}

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("Authorization")

        if tokenString == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
            c.Abort()
            return
        }

        claims := jwt.MapClaims{}
        _, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
            return secret, nil
        })

        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }
        c.Set("passenger_id", claims["passenger_id"])
        c.Next()
    }
}
