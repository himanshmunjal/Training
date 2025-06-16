package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func BaggaeAdmin(c *gin.Context){
	var baggage models.BaggaeAdmin
	if err:=c.ShouldBindJSON(&baggage); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":err.Error(),
		})
	}

	if err:=config.DB.Create(&baggage).Error; err!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Signup failed", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Lost Baggage details Added successful!",
	})
}