package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Person struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Email string `json:"email"`
}

var P1 []Person = []Person{
	{Id: 1, Name: "Alice", Age: 25, Email: "alice@example.com"},
	{Id: 2, Name: "Bob", Age: 30, Email: "bob@example.com"},
}

func info(c *gin.Context) {
	c.JSON(http.StatusOK, P1)
}

func main() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello! Welcome to the site\nType \"/details\" to view info of Persons\nType \"/details/id\" to view info of Persons\nType \"/add\" to add user details\nType \"/delete/id\" to delete student with particular id\nType \"/update/id to update user details.\"")
	})

	router.GET("/details", info) //GET ALL THE INFO OF USERS

	router.GET("/details/:id", func(c *gin.Context) {
		id_s := c.Param("id")
		id, err := strconv.Atoi(id_s)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
			return
		}
		for _, r := range P1 {
			if r.Id == id {
				c.JSON(http.StatusOK, gin.H{
					"id":    r.Id,
					"name":  r.Name,
					"age":   r.Age,
					"email": r.Email,
				})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{
			"id": id,
		})
	}) // GET INFO OF A SPECIFIC USER

	router.POST("/add", func(c *gin.Context) {
		var newP Person
		if err := c.ShouldBindJSON(&newP); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		newP.Id = len(P1) + 1
		P1 = append(P1, newP)
		c.JSON(http.StatusOK, P1)
	}) //ADD A NEW USER

	router.PUT("/update/:id", func(c *gin.Context) {
		var new_P Person

		if err := c.ShouldBindJSON(&new_P); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
			return
		}

		for i, p := range P1 {
			if p.Id == id {
				new_P.Id = id
				P1[i] = new_P
				c.JSON(http.StatusOK, new_P)
			}
		}
	}) //MODIFY ALL FIELDS OF A USER

	router.PATCH("/update/:id", func(c *gin.Context) {
		var new_P Person

		if err := c.ShouldBindJSON(&new_P); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
			return
		}
		for i, p := range P1 {
			if p.Id == id {
				new_P.Id = id
				P1[i] = new_P
				c.JSON(http.StatusOK, new_P)
			}
		}
	}) //MODIFY A FIELDS OF A USER

	router.DELETE("/delete/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
			return
		}

		for i, k := range P1 {
			if k.Id == id {
				P1 = append(P1[:i], P1[i+1:]...)
				c.JSON(http.StatusOK, gin.H{"message": "Movie deleted"})
				return
			}
		}
	})

	router.Run(":8085")
}