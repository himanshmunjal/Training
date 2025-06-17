package controllers

import (
	"net/http"

	"github.com/himanshmunjal/Training/config"
	middleware "github.com/himanshmunjal/Training/middleware/admin"
	models "github.com/himanshmunjal/Training/models/admin"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {
	var admin models.Admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&admin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Signup failed", "details": err.Error()})
		return
	}

	token, _ := middleware.GenerateAdminToken(admin.Admin_Key)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Signup successful!",
		"passenger_id": admin.Admin_Key,
		"token":        token,
	})
}

func Login(c *gin.Context) {
	var input models.Admin

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	var admin models.Admin
	if err := config.DB.Where("admin_email = ?", input.Email).First(&admin).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":       "User not found",
			"input_email": input.Email,
		})
		return
	}

	if !CheckPassword(input.Password, admin.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Password"})
		return
	}

	token, err := middleware.GenerateAdminToken(admin.Admin_Key)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Login successful",
		"token":     token,
		"admin_key": admin.Admin_Key,
	})
}

func CheckPassword(str1 string, str2 string) bool {
	return str1 == str2
}
