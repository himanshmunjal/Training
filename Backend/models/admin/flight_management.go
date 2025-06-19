package models

import "gorm.io/gorm"

type Management struct {
	gorm.Model
	FlightId        string `json:"flightId" gorm:"primaryKey"`
	Airline         string `json:"airline"`
	Source          string `json:"source"`
	Destination     string `json:"destination"`
	Depart_date     string `json:"depart_date"`
	Depart_time     string `json:"depart_time"`
	Arrival_date    string `json:"arrival_date"`
	Arrival_time    string `json:"arrival_time"`
	Total_Tickets   string `json:"total"`
	Normal_Tickets  string `json:"available"`
	Student_Tickets string `json:"student"`
	Armed_Tickets   string `json:"armed"`
	Senior_Tickets  string `json:"senior"`
	Price           string `json:"price"`
	Price_Normal    string `json:"price_normal"`
	Price_Student   string `json:"price_student"`
	Price_Senior    string `json:"price_senior"`
	Price_Armed     string `json:"price_armed"`
}
