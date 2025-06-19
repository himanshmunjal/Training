package models

type PassengerDetails struct {
	Adults int `json:"adults"`
	Kids   int `json:"kids"`
	Babies int `json:"babies"`
}

type BenefitFlags struct {
	Student       bool `json:"student"`
	ArmedForces   bool `json:"armedForces"`
	DoctorNurse   bool `json:"doctorNurse"`
	SeniorCitizen bool `json:"seniorCitizen"`
}

type BookingRequest struct {
	ID          string           `json:"id"`
	From        string           `json:"from"`
	Destination string           `json:"destination"`
	Depart      string           `json:"depart"`
	Back        string           `json:"back"`
	Passengers  PassengerDetails `json:"passengers" gorm:"embedded"`
	Benefits    BenefitFlags     `json:"benefits" gorm:"embedded"`
}
