package main

// import (
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// )

// type Request struct {
// 	Name  string `json:"name"`
// 	Email string `json:"email"`
// }

// var P1 Request

// func main() {
// 	gin.SetMode(gin.ReleaseMode)
// 	router := gin.Default()
// 	router.GET("/ping", func(c *gin.Context) {
// 		c.JSON(http.StatusOK, gin.H{"message": "Hello ji Kaise ho ?"})

// 	})

// 	router.GET("/info/:id", func(c *gin.Context) {
// 		var id = c.Param("id")
// 		c.JSON(http.StatusOK, gin.H{
// 			"Id":     id,
// 			"Name":   P1.Name,
// 			"E-mail": P1.Email,
// 		})
// 	})

// 	router.POST("/submit", func(c *gin.Context) {
// 		if err := c.ShouldBindJSON(&P1); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": err.Error(),
// 			})
// 			return
// 		}
// 		c.JSON(http.StatusOK, gin.H{
// 			"name":  P1.Name,
// 			"email": P1.Email,
// 		})
// 	})

// 	router.PUT("/test", func(c *gin.Context) {
// 		if err := c.ShouldBindJSON(&P1); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{
// 				"error": err.Error(),
// 			})
// 			return
// 		}
// 		c.JSON(http.StatusOK, gin.H{
// 			"name":  P1.Name,
// 			"email": P1.Email,
// 		})
// 	})

// 	router.Run()
// }
