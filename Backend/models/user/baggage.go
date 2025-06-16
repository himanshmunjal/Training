package models

type BaggageQuery struct {
	Baggage_id     string `json:"baggage_id" gorm:"column=baggage_id"`
	Passenger_name string `json:"pass_name" gorm:"column=passenger_name"`
	Airline        string `json:"airline" gorm:"column=airline"`
	Passenger_id   int    `json:"pass_id" gorm:"column=pass_id"`
}
