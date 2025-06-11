package routes

import (
	"net/http"

	"github.com/himanshmunjal/Training/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	r.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Test passed")
	})
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUsers)
	r.DELETE("/delete/:id", controllers.DeleteUser)
}
