package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	routeh "github.com/himanshmunjal/Training/routes"
	route "github.com/himanshmunjal/Training/routes/admin"
	routes "github.com/himanshmunjal/Training/routes/user"
)

func main() {
	config.InitDB()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173",
			"https://9d07-2401-4900-8811-a1fe-2923-adf0-5b05-9c2f.ngrok-free.app",
		"https://4d0f-2401-4900-8811-a1fe-2923-adf0-5b05-9c2f.ngrok-free.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	routes.AuthRoutes(r)
	route.AdminAuth(r)
	routeh.HeroRoute(r)
	r.Run(":" + os.Getenv("PORT"))
}
