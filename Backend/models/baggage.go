package models

import (
	"time"
	"gorm.io/gorm"
)

type Baggage struct{
	gorm.Model
	Name string `json:"pass_name"`
	Id int `json:"pass_id"`
	Flight string `json:"flight_number"`
	Date time.Time `json:"date"`
}