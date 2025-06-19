package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func FlightManage(c *gin.Context) {
	var flight models.Management
	if err := c.ShouldBindJSON(&flight); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Bad Request",
		})
		return
	}
	total, _ := strconv.Atoi(flight.Total_Tickets)
	available := int(float64(total) * 0.85)
	student := int(float64(available) * 0.05)
	senior := int(float64(available) * 0.05)
	armed := int(float64(available) * 0.05)

	price, _ := strconv.Atoi(flight.Price)
	price_normal := price
	price_student := int(float64(price) * 0.95)
	price_senior := int(float64(price) * 0.94)
	price_armed := int(float64(price) * 0.92)

	flight.Normal_Tickets = strconv.Itoa(available)
	flight.Student_Tickets = strconv.Itoa(student)
	flight.Senior_Tickets = strconv.Itoa(senior)
	flight.Armed_Tickets = strconv.Itoa(armed)

	flight.Price_Armed = strconv.Itoa(price_armed)
	flight.Price_Senior = strconv.Itoa(price_senior)
	flight.Price_Student = strconv.Itoa(price_student)
	flight.Price_Normal = strconv.Itoa(price_normal)

	if err := config.DB.Create(&flight).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Flight Details Added",
		"flight":  flight,
	})
}
