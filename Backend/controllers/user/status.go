package controllers

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func FlightInfo(c *gin.Context) {
	flightId := c.Query("flight_id")
	airline := c.Query("airline")
	date := c.Query("date")

	var flight models.FlightStatus

	if err := config.DB.Where("flight_id = ? AND airline = ? AND date = ?", flightId, airline, date).First(&flight).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
		return
	}
	// fmt.Println("Query Initiated")
	c.JSON(http.StatusOK, gin.H{
		"flight": flight,
	})
}


