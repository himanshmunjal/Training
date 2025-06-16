package models

type Admin struct {
	Admin_Key int    `json:"admin_key" gorm:"column:admin_key;primaryKey"`
	Name      string `json:"admin_name" gorm:"column:admin_name"`
	Contact   int    `json:"admin_contact" gorm:"column:admin_contact"`
	Email     string `json:"admin_email" gorm:"column:admin_email;unique"`
	Password  string `json:"admin_password" gorm:"column:admin_password"`
}

func (Admin) TableName() string {
	return "admin"
}
