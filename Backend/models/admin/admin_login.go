package models

type Admin struct {
	Admin_Key int    `json:"admin_key"`
	Name      string `json:"admin_name"`
	Contact   int    `json:"admin_contact"`
	Email     string `json:"admin_email"`
	Password  string `json:"admin_password"`
	DOB       string `json:"dob" gorm:"column:dob"`
}

func (Admin) TableName() string {
	return "admin"
}
