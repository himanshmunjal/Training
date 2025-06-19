package models

import "gorm.io/gorm"

type Passengers struct {
	gorm.Model
	Name           string `json:"pass_name" `
	Contact        string `json:"pass_contact" `
	Email          string `json:"pass_email" gorm:"unique"`
	Password       string `json:"pass_password" `
	AadharPassport string `json:"aadhar_passport" gorm:"unique"`
}

func (Passengers) TableName() string {
	return "passengers"
}

// gorm:"column=pass_name"   gorm:"column=pass_contact"
// ;column=pass_email"     gorm:"column=pass_password"
// ;column:aadhar_passport"
