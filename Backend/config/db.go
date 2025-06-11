package config

import (
	"log"
	"os"

	"github.com/himanshmunjal/Training/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SyncDB() {
	DB.AutoMigrate(&models.Passenger{})
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
