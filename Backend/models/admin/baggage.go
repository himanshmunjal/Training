package models

type BaggaeAdmin struct {
	Baggage_Id     string `json:"baggage_id" gorm:"column=baggae_id;primaryKey"`
	Passenger_name string `json:"pass_name" gorm:"column=pass_name"`
	Place          string `json:"place" gorm:"column=place"`
	Collection     string `json:"collection" gorm:"column=collection"`
	Airline        string `json:"airline" gorm:"column=airline"`
	Date           string `json:"date" gorm:"column=date"`
}

func (BaggaeAdmin) TableName() string {
	return "baggage_admin"
}
