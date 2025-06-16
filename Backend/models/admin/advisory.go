package models

import "time"

type Advisory struct {
	AdvisoryID    int       `json:"advisory_id" gorm:"primaryKey;autoIncrement;column=advisory_id"`
	Admin_Key     int       `json:"admin_key" gorm:"column=admin_key"`
	AdvisoryTitle string    `json:"advisory_title" gorm:"column=advisory_title"`
	AdvisoryText  string    `json:"advisory_text" gorm:"column=advisory_text"`
	AdvisoryDate  string    `json:"advisory_date" gorm:"column=advisory_date"`
	Airline       string    `json:"airline" gorm:"column=airline"`
	StartDate     time.Time `json:"start_date" gorm:"column=start_date"`
	EndDate       time.Time `json:"end_date" gorm:"column=end_date"`
}

func (Advisory) TableName() string {
	return "advisories"
}
