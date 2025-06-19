package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/himanshmunjal/Training/config"
	models "github.com/himanshmunjal/Training/models/admin"
	model "github.com/himanshmunjal/Training/models/user"
)

func SearchFlights(c *gin.Context) {
    var input model.BookingRequest
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
        return
    }

    // (User existence check can be kept or skipped based on flow)

    var allFlights []models.Management
    if err := config.DB.Find(&allFlights).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch flights"})
        return
    }

    var benefitFlights []models.Management
    var normalFlights []models.Management
    totalSeats := input.Passengers.Adults + input.Passengers.Kids

    for _, flight := range allFlights {
        if flight.Source != input.From || flight.Destination != input.Destination || flight.Depart_date != input.Depart {
            continue
        }

        normalSeats, _ := strconv.Atoi(flight.Normal_Tickets)
        totalCapacity, _ := strconv.Atoi(flight.Total_Tickets)
        benefitApplied := false

        var benefitSeats int
        var basePrice float64

        switch {
        case input.Benefits.Student && flight.Student_Tickets != "":
            benefitSeats, _ = strconv.Atoi(flight.Student_Tickets)
            basePrice, _ = strconv.ParseFloat(flight.Price_Student, 64)
            benefitApplied = benefitSeats >= totalSeats
        case input.Benefits.SeniorCitizen && flight.Senior_Tickets != "":
            benefitSeats, _ = strconv.Atoi(flight.Senior_Tickets)
            basePrice, _ = strconv.ParseFloat(flight.Price_Senior, 64)
            benefitApplied = benefitSeats >= totalSeats
        case input.Benefits.ArmedForces && flight.Armed_Tickets != "":
            benefitSeats, _ = strconv.Atoi(flight.Armed_Tickets)
            basePrice, _ = strconv.ParseFloat(flight.Price_Armed, 64)
            benefitApplied = benefitSeats >= totalSeats
        default:
            basePrice, _ = strconv.ParseFloat(flight.Price_Normal, 64)
        }

        if !benefitApplied && normalSeats < totalSeats {
            continue
        }

        bookedRatio := float64(totalCapacity-normalSeats) / float64(totalCapacity)
        hikeFactor := 1.0 + (float64(int(bookedRatio*100)/20) * 0.05)
        finalPrice := basePrice * hikeFactor
        flight.Price = fmt.Sprintf("%.2f", finalPrice)

        if benefitApplied {
            benefitFlights = append(benefitFlights, flight)
        } else {
            normalFlights = append(normalFlights, flight)
        }
    }

    filtered := append(benefitFlights, normalFlights...)
    c.JSON(http.StatusOK, gin.H{"flights": filtered})
}

func BookFlight(c *gin.Context) {
    var input struct {
        FlightID     string `json:"flightId"`
        Seats        int    `json:"seats"`
        BenefitType  string `json:"benefit"` // e.g., "student", "senior", "normal"
    }
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid booking request"})
        return
    }

    var flight models.Management
    if err := config.DB.Where("flight_id = ?", input.FlightID).First(&flight).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Flight not found"})
        return
    }

    switch input.BenefitType {
    case "student":
        count, _ := strconv.Atoi(flight.Student_Tickets)
        if count < input.Seats {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient student tickets"})
            return
        }
        flight.Student_Tickets = strconv.Itoa(count - input.Seats)
    case "senior":
        count, _ := strconv.Atoi(flight.Senior_Tickets)
        if count < input.Seats {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient senior tickets"})
            return
        }
        flight.Senior_Tickets = strconv.Itoa(count - input.Seats)
    case "armed":
        count, _ := strconv.Atoi(flight.Armed_Tickets)
        if count < input.Seats {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient armed forces tickets"})
            return
        }
        flight.Armed_Tickets = strconv.Itoa(count - input.Seats)
    default:
        count, _ := strconv.Atoi(flight.Normal_Tickets)
        if count < input.Seats {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient normal tickets"})
            return
        }
        flight.Normal_Tickets = strconv.Itoa(count - input.Seats)
    }

    total, _ := strconv.Atoi(flight.Total_Tickets)
    flight.Total_Tickets = strconv.Itoa(total - input.Seats)

    if err := config.DB.Save(&flight).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Booking failed"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
		"message": "Booking successful",
	})
}


// func Flights(c *gin.Context){
// 	var input model.BookingRequest
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
// 		return
// 	}

// 	var pass model.Passengers
// 	if err := config.DB.Where("id = ?", input.ID).First(&pass).Error; err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
// 		return
// 	}

// 	var allFlights []models.Management
// 	if err := config.DB.Find(&allFlights).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch flights"})
// 		return
// 	}

// 	var benefitFlights []models.Management
// 	var normalFlights []models.Management

// 	totalSeats := input.Passengers.Adults + input.Passengers.Kids

// 	for _, flight := range allFlights {
// 		if flight.Source != input.From || flight.Destination != input.Destination || flight.Depart_date != input.Depart {
// 			continue
// 		}
// 		n_seats, _ := strconv.Atoi(flight.Normal_Tickets)
// 		t_seats, _ := strconv.Atoi(flight.Total_Tickets)
// 		benefits := false

// 		var benefitSeats int
// 		var benefitType string
// 		var basePrice float64

// 		if input.Benefits.Student && flight.Student_Tickets != "" {
// 			benefitSeats, _ = strconv.Atoi(flight.Student_Tickets)
// 			basePrice, _ = strconv.ParseFloat(flight.Price_Student, 64)
// 			benefitType = "student"
// 		}
// 	}
// }