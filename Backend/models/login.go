package models

import "gorm.io/gorm"

type Passenger struct {
    gorm.Model
	Name           string `json:"pass_name"`
	Contact        string `json:"pass_contact"`
	Email          string `json:"pass_email" gorm:"unique"`
	Password       string `json:"pass_password"`
	AadharPassport string `json:"aadhar_passport" gorm:"unique"`
}
