package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/user"
)

func FindbyID(c *gin.Context) {
	passIDStr := c.Param("pass_id")
	passID, err := strconv.ParseInt(passIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pass_id must be a valid number"})
		return
	}
	var passenger models.Passengers
	if err := config.DB.Where("pass_id = ?", passID).First(&passenger).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":  "User Not found",
			"error1": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"Passenger": passenger,
	})
}

func FindbyName(c *gin.Context) {
	passName := c.Param("pass_name")

	var passenger models.Passengers
	if err := config.DB.Where("pass_name = ?", passName).First(&passenger).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"Passenger": passenger,
	})
}
