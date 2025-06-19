package routes

import (
	controllers "github.com/himanshmunjal/Training/controllers/user"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	userGroup := r.Group("/user")
	{
		userGroup.POST("/signup", controllers.Signup)
		userGroup.POST("/login", controllers.Login)
		userGroup.GET("/status", controllers.FlightInfo)
		userGroup.GET("/baggage", controllers.Baggage_info)
		userGroup.POST("/submit", controllers.SubmitComplaint)
		userGroup.GET("/profile/:id", controllers.UserProfile)
		userGroup.PUT("/update/:id", controllers.UpdateUserProfile)
		userGroup.POST("/booking", controllers.SearchFlights)
		userGroup.POST("/book", controllers.BookFlight)
	}

}

// r.GET("/", func(ctx *gin.Context) {
// 	ctx.String(http.StatusOK, "Test passed")
// })
// r.GET("/users", controllers.GetUsers)
// r.GET("/users/:id", controllers.GetUsers)
// r.DELETE("/delete/:id", controllers.DeleteUser)
