package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/himanshmunjal/Training/config"
	"github.com/himanshmunjal/Training/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Allow frontend requests
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // If using cookies or Authorization tokens
	}))
	routes.AuthRoutes(r)
	r.Run(":" + os.Getenv("PORT")) // Default port is 8080, can be overridden by PORT env variable
}
