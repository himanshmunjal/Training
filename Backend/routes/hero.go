package routes

import (
	controllers "github.com/himanshmunjal/Training/controllers"

	"github.com/gin-gonic/gin"
)

func HeroRoute(r *gin.Engine) {
	r.GET("/hero/advisory", controllers.ActiveAdvisory)
}
