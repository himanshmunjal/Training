package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Info struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Age    int    `json:"age"`
	E_mail string `json:"email"`
}

var person []Info

func main() {
	person = []Info{
		{Id: 1, Name: "Alice", Age: 25, E_mail: "alice@example.com"},
		{Id: 2, Name: "Bob", Age: 30, E_mail: "bob@example.com"},
		{Id: 3, Name: "Charlie", Age: 22, E_mail: "charlie@example.com"},
		{Id: 4, Name: "David", Age: 28, E_mail: "david@example.com"},
		{Id: 5, Name: "Eve", Age: 35, E_mail: "eve@example.com"},
	}
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Welcome to Info Website")
	})

	router.GET("/type", func(c *gin.Context) {
		c.JSON(http.StatusOK, person)
	})

	router.GET("/type/:id", func(c *gin.Context) {
		search := c.Param("id")
		id, err := strconv.Atoi(search)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Bad request sent",
			})
		}
		for _, k := range person {
			if k.Id == id {
				c.JSON(http.StatusBadRequest, gin.H{
					"id":     k.Id,
					"name":   k.Name,
					"age":    k.Age,
					"e-mail": k.E_mail,
				})
			}
		}
	})

	router.POST("/add", func(c *gin.Context) {
		var new Info
		if err := c.ShouldBindJSON(&new); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		}
		new.Id = len(person) + 1
		person = append(person, new)
		c.JSON(http.StatusOK, person)
	})

	router.DELETE("/remove/:id", func(c *gin.Context) {
		new_id := c.Param("id")
		id, err := strconv.Atoi(new_id)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error": err.Error(),
			})
		}
		for i, j := range person {
			if j.Id == id {
				person = append(person[:i], person[i+1:]...)
				c.JSON(http.StatusOK, gin.H{"message": "deletion done"})
				return
			}
		}
	})

	router.PUT("/put/:id", func(c *gin.Context) {
		var new Info

		if err := c.ShouldBindJSON(&new); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		new_id := c.Param("id")
		id, err := strconv.Atoi(new_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Bad status request")
		}
		for i, k := range person {
			if k.Id == id {
				person[i] = new
				c.JSON(http.StatusOK, person)
			}
		}
	})

	router.PATCH("/put/:id", func(c *gin.Context) {
		var new Info

		if err := c.ShouldBindJSON(&new); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		new_id := c.Param("id")
		id, err := strconv.Atoi(new_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Bad status request")
		}
		for i, k := range person {
			if k.Id == id {
				person[i] = new
				c.JSON(http.StatusOK, person)
			}
		}
	})

	router.Run(":8085")
}
