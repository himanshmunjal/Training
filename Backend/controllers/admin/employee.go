package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
)

func Addemp(c *gin.Context) {
	adminKeyStr := c.Param("admin_key")

	adminID, err := strconv.ParseInt(adminKeyStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin_key must be a valid number"})
		return
	}

	var emp models.Employee
	if err := c.ShouldBindJSON(&emp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid employee data", "details": err.Error()})
		return
	}

	var admin models.Admin
	if err := config.DB.Where("admin_key = ?", adminID).First(&admin).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin ID not valid"})
		return
	}

	if err := config.DB.Create(&emp).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Employee added",
		"employee": emp,
	})
}

// func Addemp(c *gin.Context) {
// 	adminKeyStr := c.Query("added_by")
// 	if adminKeyStr == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Missing admin_key in query",
// 		})
// 		return
// 	}
// 	adminID, err := strconv.ParseInt(adminKeyStr, 10, 64)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "admin_key must be a number",
// 		})
// 		return
// 	}
// 	var emp models.Employee
// 	if err := c.ShouldBindJSON(&emp); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Invalid employee JSON format",
// 			"hint":  err.Error(),
// 		})
// 		return
// 	}
// 	// Optional: Cross-check if emp.AddedBy matches adminID
// 	if emp.AddedBy != adminID {
// 		c.JSON(http.StatusUnauthorized, gin.H{
// 			"error": "Mismatch between added_by and admin_key",
// 		})
// 		return
// 	}
// 	// Validate admin existence
// 	var admin models.Admin
// 	if err := config.DB.Where("admin_key = ?", adminID).First(&admin).Error; err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{
// 			"error": "Admin ID not valid",
// 		})
// 		return
// 	}
// 	// Insert employee
// 	if err := config.DB.Create(&emp).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"error":  "Failed to insert employee",
// 			"detail": err.Error(),
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"message":  "Employee added successfully",
// 		"employee": emp,
// 	})
// }

// func Addemp(c *gin.Context) {
//     var emp models.Employee
//     if err := c.ShouldBindJSON(&emp); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid format"})
//         return
//     }
//     // Use emp.AddedBy instead of a query param
//     var admin models.Admin
//     if err := config.DB.Where("admin_key = ?", emp.AddedBy).First(&admin).Error; err != nil {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin ID not valid"})
//         return
//     }
//     // Save to DB
//     if err := config.DB.Create(&emp).Error; err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }
//     c.JSON(http.StatusOK, gin.H{"employee": emp})
// }

func DeleteEmp(c *gin.Context) {
	empId := c.Param("emp_id")
	empName := c.Param("emp_name")
	adminkey := c.Param("admin_key")

	var admin models.Admin
	if err := config.DB.Where("admin_key = ?", adminkey).First(&admin).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Admin ID not valid",
		})
		return
	}

	var emp models.Employee
	if err := config.DB.Where("id = ? AND name = ?", empId, empName).First(&emp).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
		return
	}

	if err := config.DB.Delete(&emp).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete employee"})
		return
	}

	c.JSON(200, gin.H{"message": "Employee deleted successfully"})
}

func Getemp(c *gin.Context) {
	var emp []models.Employee
	if err := config.DB.Find(&emp).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, emp)
}

func Getempbyid(c *gin.Context) {
    id := c.Param("id") // this is the URL param

    var emp models.Employee
    if err := config.DB.Where("id = ?", id).First(&emp).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Employee ID not valid"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message":  "Employee details successfully fetched",
        "employee": emp,
    })
}

func Getempbyname(c *gin.Context) {
	name := c.Param("name")

	var emp []models.Employee
	if err := config.DB.Where("name = ?", name).Find(&emp).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Employee ID not valid",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message":  "Employee details successfully fetched",
		"employee": emp,
	})
}

func Getempbydepartment(c *gin.Context) {
	department := c.Param("department")
	var emp []models.Employee
	if err := config.DB.Where("department = ?", (department)).Find(&emp).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Employee ID not valid",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message":  "Employee details successfully fetched",
		"employee": emp,
	})
}
