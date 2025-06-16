package controllers

import (
	"net/http"

	"github.com/himanshmunjal/Training/config"
	"github.com/himanshmunjal/Training/middleware/user"
	"github.com/himanshmunjal/Training/models/user"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashed), err
}

func Signup(c *gin.Context) {
	var passenger models.Passengers
	if err := c.ShouldBindJSON(&passenger); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existing models.Passengers
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
	var passengers []models.Passengers
	if err := config.DB.Find(&passengers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users"})
		return
	}

	c.JSON(http.StatusOK, passengers)
}

func DeleteUser(c *gin.Context) {
	pass_Id := c.Param("id")
	var passenger models.Passengers
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
	var pass models.Passengers
	ids := c.Param("id")
	if err := config.DB.Where("id = ?", ids).First(&pass).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, pass)
}

func Login(c *gin.Context) {
	var input models.Passengers

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	var passengers models.Passengers
	if err := config.DB.Where("email = ?", input.Email).First(&passengers).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found", "pass_email": passengers.Email, "input_email": input.Email, "pass_password": passengers.Password, "input_password": input.Password})
		return
	}

	if !CheckPassword(input.Password, passengers.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Password"})
	}

	// Generate JWT Token (But Do NOT Store Login Data)
	token, err := middleware.GenerateToken(passengers.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Return Success Response WITHOUT saving anything
	c.JSON(http.StatusOK, gin.H{
		"message":      "Login successful",
		"token":        token,
		"passenger_id": passengers.ID,
	})
}

func CheckPassword(str1 string, str2 string) bool {
	return str1==str2
}
