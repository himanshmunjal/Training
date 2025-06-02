package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/controllers"
)

type Info struct {
	Id     int    `gorm:"primaryKey" json:"id"`
	Name   string `json:"name"`
	Age    int    `json:"age"`
	E_mail string `json:"email"`
}

var person []Info

func main() {
	router := gin.Default()
	notesControllers := &controllers.NotesControllers{ /* Pass required fields or arguments here */ }
	notesControllers.InitNotesControllerRoutes(router)
	router.GET("/user", func(c *gin.Context) {
		var users []Info
		if err := db.Find(&users).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No user found",
			})
			return
		}
		c.JSON(http.StatusOK, users)
	})

	router.GET("/user/:id", func(c *gin.Context) {
		var users []Info
		id := c.Param("id")
		if err := db.Find(&users, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "No user found",
			})
			return
		}
		c.JSON(http.StatusOK, users)
	})

	router.POST("/add", func(ctx *gin.Context) {
		var user Info
		if err := ctx.ShouldBindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to bind user",
			})
			return
		}
		if result := db.Create(&user); result.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": result.Error.Error(),
			})
			return
		}
		ctx.JSON(http.StatusCreated, user)
	})

	router.PUT("/update/:id", func(c *gin.Context) {
		var user Info
		id := c.Param("id")
		if res := db.First(&user, id); res.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "User not found",
			})
			return
		}
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		db.Save(&user)
		c.JSON(http.StatusOK, user)
	})

	router.DELETE("/delete/:id", func(ctx *gin.Context) {
		var user Info
		id := ctx.Param("id")
		if res := db.First(&user, id); res.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{
				"error": "User Not found",
			})
			return
		}
		db.Delete(&user)
		ctx.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
	})

	router.Run(":1212")
}
