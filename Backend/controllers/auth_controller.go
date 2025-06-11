package controllers

import (
	"net/http"

	"github.com/himanshmunjal/Training/config"
	"github.com/himanshmunjal/Training/middleware"
	"github.com/himanshmunjal/Training/models"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {
	var passenger models.Passenger
	if err := c.ShouldBindJSON(&passenger); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ✅ Ignore soft-deleted records
	var existing models.Passenger
	if err := config.DB.
		Unscoped(). // 👈 If you want to include soft-deleted records, or remove this if not needed
		Where("email = ? AND deleted_at IS NULL", passenger.Email).
		First(&existing).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}

	if err := config.DB.Create(&passenger).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Signup failed"})
		return
	}

	token, _ := middleware.GenerateToken(passenger.ID)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Signup successful!",
		"passenger_id": passenger.ID,
		"token":        token,
	})
}

func GetUsers(c *gin.Context) {
	var passengers []models.Passenger
	if err := config.DB.Find(&passengers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users"})
		return
	}

	c.JSON(http.StatusOK, passengers)
}

func DeleteUser(c *gin.Context) {
	pass_Id := c.Param("id")
	var passenger models.Passenger
	if err := config.DB.Where("id = ?", pass_Id).First(&passenger).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	if err := config.DB.Delete(&passenger).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func Getbyid(c *gin.Context) {
	var pass models.Passenger
	ids := c.Param("id")
	if err := config.DB.Where("id = ?", ids).First(&pass).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, pass)
}

func Login(c *gin.Context) {
	var input models.Passenger
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var passenger models.Passenger
	if err := config.DB.Where("email = ?", input.Email).First(&passenger).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	if !CheckPassword(input.Password, passenger.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	token, _ := middleware.GenerateToken(passenger.ID)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Login successful",
		"token":        token,
		"passenger_id": passenger.ID,
	})
}

func CheckPassword(str1 string, str2 string) bool {
	if str1 != str2 {
		return false
	}
	return true
}
