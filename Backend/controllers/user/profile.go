package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/user"
)

func UserProfile(c *gin.Context) {
	passengerID := c.Param("id")

	var user models.Passengers
	if err := config.DB.First(&user, passengerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":      user.ID,
		"name":    user.Name,
		"email":   user.Email,
		"contact": user.Contact,
	})
}

// func UpdateUserProfile(c *gin.Context) {
//     passengerID := c.Param("id")
//     var input struct {
//         Name    string `json:"name"`
//         Contact string `json:"contact"`
//     }
//     if err := c.ShouldBindJSON(&input); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
//         return
//     }
//     if err := config.DB.Model(&models.Passengers{}).
//         Where("id = ?", passengerID).
//         Updates(models.Passengers{
//             Name:    input.Name,
//             Contact: input.Contact,
//         }).Error; err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
// }

func UpdateUserProfile(c *gin.Context) {
	id := c.Param("id")

	var passenger models.Passengers
	if err := config.DB.Where("id = ?", id).First(&passenger).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	var input struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Not valid input",
		})
	}

	passenger.Name = input.Name
	passenger.Email = input.Email

	if err := config.DB.Save(&passenger); err != nil {
		c.JSON(500, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(200, gin.H{"message": "Profile updated successfully"})
}

// func GetUserBookings(c *gin.Context) {
//     passengerID := c.Param("id")

//     var bookings []models.Booking
//     if err := config.DB.Where("passenger_id = ?", passengerID).Find(&bookings).Error; err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch bookings"})
//         return
//     }

//     c.JSON(http.StatusOK, bookings)
// }
