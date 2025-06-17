package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	model "github.com/himanshmunjal/Training/models/admin"
	models "github.com/himanshmunjal/Training/models/user"
)

// func Baggage_info(c *gin.Context){
// 	var baggage models.BaggageQuery
// 	if err:= c.ShouldBindJSON(&baggage); err!=nil{
// 		c.JSON(http.StatusBadRequest,gin.H{
// 			"error":"Bad request sent",
// 		})
// 		return
// 	}
// 	var pass models.Passengers
// 	if err:= config.DB.Where("pass_name = ? AND pass_id = ?",baggage.Passenger_name,baggage.Passenger_id).First(&pass).Error;err!=nil{
// 		c.JSON(http.StatusUnauthorized,gin.H{
// 			"error":"Username/ID not valid",
// 		})
// 		return
// 	}
// 	if err:= config.DB.Where("pass_name = ? AND pass_id = ? AND airline = ?",baggage.Passenger_name,baggage.Passenger_id,baggage.Airline).Error; err!=nil{
// 		c.JSON(http.StatusUnauthorized,gin.H{
// 			"error":"No baggage with such details found",
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK,gin.H{
// 		"baggage":baggage,
// 	})
// }

func Baggage_info(c *gin.Context) {
	passName := c.Query("passenger_name")
	passId := c.Query("pass_id")
	baggageId := c.Query("baggage_id")
	airline := c.Query("airline")

	var pass models.Passengers
	if err := config.DB.Where("name = ?  AND id = ?", passName, passId).First(&pass).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Username/ID not valid",
		})
		return
	}

	var baggage model.BaggaeAdmin
	if err := config.DB.
		Where("baggage_id = ? AND airline = ? AND passenger_name ILIKE ?", baggageId, airline, passName).
		First(&baggage).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No baggage with such details found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"baggage": baggage})
}
