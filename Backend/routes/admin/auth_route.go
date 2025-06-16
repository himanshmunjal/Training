package routes

import (
	controllers "github.com/himanshmunjal/Training/controllers/admin"

	"github.com/gin-gonic/gin"
)

func AdminAuth(r *gin.Engine) {
	userGroup := r.Group("/admin")
	{
		userGroup.POST("/signup", controllers.Signup)
		userGroup.POST("/login", controllers.Login)
		userGroup.POST("/status", controllers.Addstatus)
		userGroup.POST("/baggage", controllers.BaggaeAdmin)
		userGroup.POST("/advisory", controllers.Advisory)
		userGroup.GET("/advisories", controllers.GetAllAdvisories)
		userGroup.DELETE("/advisory/:id", controllers.DeleteAdvisory)
	}
}
