package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func GetbyID(c *gin.Context){
	id := c.Param("id")
	var flights []models.Management
	if err:=config.DB.Where("flight_id = ?",id).Find(&flights).Error;err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"flights":flights,
	})
}

func Getbyairline(c *gin.Context){
	airline := c.Param("airline")
	var flights []models.Management
	if err:=config.DB.Where("airline = ?",airline).Find(&flights).Error;err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"flights":flights,
	})
}

func Getbysource(c *gin.Context){
	source := c.Param("source")
	var flights []models.Management
	if err:=config.DB.Where("source = ?",source).Find(&flights).Error;err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"flights":flights,
	})
}

func Getbydestination(c *gin.Context){
	destination := c.Param("destination")
	var flights []models.Management
	if err:=config.DB.Where("destination = ?",destination).Find(&flights).Error;err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"flights":flights,
	})
}

func Getbydate(c *gin.Context){
	date := c.Param("date")
	var flights []models.Management
	if err:=config.DB.Where("depart_date = ?",date).Find(&flights).Error;err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"flights":flights,
	})
}

func GetAll(c *gin.Context) {
    var flights []models.Management
    if err := config.DB.Find(&flights).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"flights": flights})
}
