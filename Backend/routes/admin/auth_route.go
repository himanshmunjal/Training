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
		userGroup.GET("/details/:pass_id", controllers.FindbyID)
		userGroup.GET("/detail/:pass_name", controllers.FindbyName)
		userGroup.POST("/addemp/:admin_key", controllers.Addemp)
		userGroup.DELETE("/deleteemp/:emp_id/:emp_name/:admin_key", controllers.DeleteEmp)
		userGroup.GET("/getemp", controllers.Getemp)
	}
}
