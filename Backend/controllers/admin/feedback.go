package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
	model "github.com/himanshmunjal/Training/models/user"
)

func Feedback(c *gin.Context){
	var input models.Feedback
	if err:=c.ShouldBindJSON(&input);err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"error":"Input not valid",
		})
		return
	}
	
	var complaint []model.Complaint
	if (input.Date!=""&& input.Airline==""){
		if err:= config.DB.Where("date = ?",input.Date).Find(&complaint).Error;err!=nil{
			c.JSON(http.StatusUnauthorized,gin.H{
				"error":err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK,gin.H{
			"complaint":complaint,
		})
	}else if(input.Date==""&& input.Airline!=""){
		if err:= config.DB.Where("airline = ?",input.Airline).Find(&complaint).Error;err!=nil{
			c.JSON(http.StatusUnauthorized,gin.H{
				"error":err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK,gin.H{
			"complaint":complaint,
		})
	}else{
		if err:= config.DB.Where("airline = ? AND date = ?",input.Airline, input.Date).Find(&complaint).Error;err!=nil{
			c.JSON(http.StatusUnauthorized,gin.H{
				"error":err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK,gin.H{
			"complaint":complaint,
		})
	}

}