package controllers

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	"github.com/himanshmunjal/Training/models/admin"
)

func ActiveAdvisory(c *gin.Context){
	now := time.Now()
	var advisory []models.Advisory
	err := config.DB.Where("start_date <= ? AND end_date >= ?", now, now).Find(&advisory).Error
	if err != nil {
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	if len(advisory) == 0 {
		c.JSON(404, gin.H{"error": "No active advisory found"})
		return
	}
	c.JSON(200, gin.H{
		"message": "Active advisory found",
		"advisory":advisory,

	})
}