package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func Addstatus(c *gin.Context) {
	var flight models.FlightStatus
	if err := c.ShouldBindJSON(&flight); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := config.DB.Create(&flight).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register complaint"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Status": flight,
	})
}
