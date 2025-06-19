package models

import "gorm.io/gorm"

type Complaint struct {
	gorm.Model
	PassID  int    `json:"pass_id" gorm:"column=pass_id"`
	Name    string `json:"pass_name" gorm:"column=pass_name"`
	Airline string `json:"airline" gorm:"column=airline"`
	Message string `json:"message" gorm:"column=complaint"`
	Date    string `json:"date" gorm:"column=date"`
}

func (Complaint) TableName() string {
	return "complaint"
}
