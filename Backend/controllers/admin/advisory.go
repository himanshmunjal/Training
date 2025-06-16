package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func Advisory(c *gin.Context) {
	var advisory models.Advisory
	if err := c.ShouldBindJSON(&advisory); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&advisory).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Advisory created successfully", "advisory": advisory})
}

func GetAllAdvisories(c *gin.Context) {
	var advisories []models.Advisory
	if err := config.DB.Find(&advisories).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, advisories)
}

func DeleteAdvisory(c *gin.Context) {
	id := c.Param("id")

	var advisory models.Advisory
	if err := config.DB.First(&advisory, id).Error; err != nil {
		c.JSON(404, gin.H{"error": "Advisory not found"})
		return
	}

	if err := config.DB.Delete(&advisory).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete advisory"})
		return
	}

	c.JSON(200, gin.H{"message": "Advisory deleted successfully"})
}
