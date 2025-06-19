package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/himanshmunjal/Training/config"
	middleware "github.com/himanshmunjal/Training/middleware/admin"
	models "github.com/himanshmunjal/Training/models/admin"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {
    var admin models.Admin
    if err := c.ShouldBindJSON(&admin); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
        return
    }
	fmt.Println("Received Admin:", admin)


    if !isDateMatchingNumber(admin.DOB, admin.Admin_Key) {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Admin Key does not match DOB (day + month)"})
        return
    }

    if err := config.DB.Create(&admin).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Signup failed", "details": err.Error()})
        return
    }

    token, _ := middleware.GenerateAdminToken(admin.Admin_Key)

    c.JSON(http.StatusOK, gin.H{
        "message":    "Signup successful!",
        "admin_key":  admin.Admin_Key,
        "token":      token,
    })
}

func isDateMatchingNumber(dateStr string, expected int) bool {
    // parsed, err := time.Parse("02-01-2006", dateStr)
	parsed, err := time.Parse("2006-01-02", dateStr)

    if err != nil {
        return false
    }

    dd := fmt.Sprintf("%02d", parsed.Day())
    mm := fmt.Sprintf("%02d", int(parsed.Month()))
    combined := dd + mm

    actual, err := strconv.Atoi(combined)
    if err != nil {
        return false
    }

    return actual == expected
}
  

func Login(c *gin.Context) {
	var input models.Admin

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	var admin models.Admin
	if err := config.DB.Where("email = ?", input.Email).First(&admin).Error; err != nil {
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
