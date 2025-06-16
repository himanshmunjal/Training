package models

import "gorm.io/gorm"

type Passengers struct {
	gorm.Model
	Name           string `json:"pass_name" gorm:"column=pass_name"`
	Contact        string `json:"pass_contact" gorm:"column=pass_contact"`
	Email          string `json:"pass_email" gorm:"unique;column=pass_email"`
	Password       string `json:"pass_password" gorm:"column=pass_password"`
	AadharPassport string `json:"aadhar_passport" gorm:"unique;column:aadhar_passport"`
}

func (Passengers) TableName() string {
	return "passengers"
}
