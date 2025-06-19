package controllers

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func ActiveAdvisory(c *gin.Context) {

	loc, _ := time.LoadLocation("Asia/Kolkata")
	now := time.Now().In(loc)

	var advisory []models.Advisory
	err := config.DB.Debug().Where("start_date <= ? AND end_date >= ?", now, now).Find(&advisory).Error

	if err != nil {
		c.JSON(500, gin.H{"error": "Internal Server Error", "details": err.Error()})
		return
	}
	if len(advisory) == 0 {
		c.JSON(404, gin.H{"error": "No active advisory found"})
		return
	}
	c.JSON(200, gin.H{
		"message":  "Active advisory found",
		"advisory": advisory,
	})
}
