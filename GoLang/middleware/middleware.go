package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Info struct {
	Id    int    `gorm:"primaryKey" json:"id"`
	Name  string `json:"name" binding:"required, min=2,max=50"`
	Age   int    `json:"age" binding:"required, min=12,max=120"`
	Email string `json:"e_mail" binding:"required,email"`
}

var db *gorm.DB

func LoginMiddleware() gin.HandlerFunc{
	return func(ctx *gin.Context) {
		log.Printf("Incoming request is: %s %s",ctx.Request.Method, ctx.Request.URL.Path)
		ctx.Next()
		log.Printf("Response Status: %d",ctx.Writer.Status())
	}
}

func ErrorHandlerMiddleware() gin.HandlerFunc{
	return func(ctx *gin.Context) {
		ctx.Next()

		if len(ctx.Errors) > 0{
			ctx.JSON(-1, gin.H{
				"errors": ctx.Errors,
			})
		}
	}
}

func initdb() {
	dsn := "host=localhost user=postgres password=1981 dbname=info port=5432 sslmode=disable"
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	db.AutoMigrate(&Info{})
}

func main() {
	initdb()

	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(LoginMiddleware())
	router.Use(ErrorHandlerMiddleware())
	router.Use(cors.Default())
	if db == nil {
		log.Fatal("Database connection failed: db is nil")
	}

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Welcome to Info Website")
	})

	router.GET("/type", func(c *gin.Context) {
		var users []Info
		if err := db.Find(&users).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, users)
	})

	router.GET("/type/:id", func(c *gin.Context) {
		search := c.Param("id")
		id, err := strconv.Atoi(search)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid id",
			})
			return
		}
		var person Info
		if err := db.First(&person, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "User Not found",
			})
			return
		}
		c.JSON(http.StatusOK, person)
	})

	router.POST("/add", func(c *gin.Context) {
		var new Info
		if err := c.ShouldBindJSON(&new); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Not in correct format"})
			return
		}
		if err := db.Create(&new).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, new)
	})

	router.DELETE("/remove/:id", func(c *gin.Context) {
		new_id := c.Param("id")
		id, err := strconv.Atoi(new_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.Delete(&Info{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
	})

	router.PUT("/put/:id", func(c *gin.Context) {
		new_id := c.Param("id")
		id, err := strconv.Atoi(new_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Bad status request")
			return
		}

		var person Info
		if err := db.First(&person, id).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User id"})
			return
		}

		var new Info
		if err := c.ShouldBindJSON(&new); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		person.Name = new.Name
		person.Age = new.Age
		person.Email = new.Email
		if err := db.Save(&person).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, person)
	})

	router.PATCH("/put/:id", func(c *gin.Context) {
		var new Info
		if err := c.ShouldBindJSON(&new); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		new_id := c.Param("id")
		id, err := strconv.Atoi(new_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid user id")
			return
		}

		var person Info
		if err := db.First(&person, id).Error; err != nil {
			c.JSON(http.StatusBadRequest, "User not found")
			return
		}
		if new.Name != "" {
			person.Name = new.Name
		}
		if new.Age != 0 {
			person.Age = new.Age
		}
		if new.Email != "" {
			person.Email = new.Email
		}

		if err := db.Save(&person).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, person)
	})

	router.Run(":1030")
}
