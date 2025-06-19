package models

type FlightStatus struct {
	FlightID         string `json:"flight_id" gorm:"column=flight_id"`
	Airline          string `json:"airline" gorm:"column=airline"`
	Date             string `json:"date" gorm:"column=date"`
	FlightStatus     string `json:"flight_status" gorm:"column=flight_status"`
	Source           string `json:"source" gorm:"column=source"`
	Destination      string `json:"destination" gorm:"column=destination"`
	Depart_time      string `json:"depart_time" gorm:"column=depart_time"`
	Arrival_time     string  `json:"arrival_time" gorm:"column=arrival_time"`
	Depart_terminal  string  `json:"depart_terminal" gorm:"column=depart_time"`
	Arrival_terminal string  `json:"arrival_terminal" gorm:"column=depart_time"`
}

func (FlightStatus) TableName() string {
	return "flightstatus"
}
