package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	model "github.com/himanshmunjal/Training/models/admin"
	models "github.com/himanshmunjal/Training/models/user"
)

var DB *gorm.DB

func SyncDB() {
	DB.AutoMigrate(
		// ADMIN
		&model.Admin{},
		&model.BaggaeAdmin{},
		&model.FlightStatus{},
		&model.Advisory{},
		&model.Employee{},
		&model.Management{},

		// USER
		&models.Passengers{},
		&models.BaggageQuery{},
		&models.Complaint{},
	)
}

func InitDB() {
	var err error
	_ = godotenv.Load()
	dsn := os.Getenv("DATABASE_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	SyncDB()
}
