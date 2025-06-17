package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/user"
)

func SubmitComplaint(c *gin.Context) {
	var complaint models.Complaint
	if err := c.ShouldBindJSON(&complaint); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Check if passenger exists
	var passenger models.Passengers
	if err := config.DB.Where("id = ? ", complaint.PassID).First(&passenger).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Passenger not found"})
		return
	}

	// Create complaint
	if err := config.DB.Create(&complaint).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register complaint"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "Complaint registered successfully",
		"complaint_id":   complaint.ID,
		"submitted_name": complaint.Name,
	})
}
