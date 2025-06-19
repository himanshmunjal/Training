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
			"https://skyport-frontend.onrender.com/"},
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
