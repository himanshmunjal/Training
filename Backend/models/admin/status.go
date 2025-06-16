package models

type FlightStatus struct {
	FlightID     string `json:"flight_id" gorm:"column=flight_id"`
	Airline      string `json:"airline" gorm:"column=airline"`
	Date         string `json:"date" gorm:"column=date"`
	FlightStatus string `json:"flight_status" gorm:"column=flight_status"`
	Source       string `json:"source" gorm:"column=source"`
	Destination  string `json:"destination" gorm:"column=destination"`
}

func (FlightStatus) TableName() string {
	return "flightStatus"
}
