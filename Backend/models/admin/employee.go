package models

type Employee struct {
    Id         string `json:"emp_id" gorm:"column=emp_id;primaryKey"`
    Name       string `json:"emp_name" gorm:"column=emp_name"`
    Department string `json:"emp_department" gorm:"column=emp_department"`
    Contact    string `json:"emp_contact" gorm:"column=emp_contact"`
    Email      string `json:"emp_email" gorm:"column=emp_email"`
    AddedBy    int64  `json:"added_by" gorm:"column=added_by"`
}

