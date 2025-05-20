Create Database Airport_Management;
Use Airport_Management;

CREATE TABLE Airport(
    airport_id INT PRIMARY KEY,
    airport_name VARCHAR(50) NOT NULL,
    airpot_code VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL,
    airpot_state VARCHAR(50) NOT NULL
);

CREATE TABLE Airlines(
    airline_id INT PRIMARY KEY,
    airline_name VARCHAR(50) NOT NULL,
    airline_code VARCHAR(10) NOT NULL
);

CREATE TABLE Flight(
    flight_id INT PRIMARY KEY,
    airline_id INT,
    source_id INT,
    destination_id INT,
    flight_status enum("On-Time","Delayed","Cancelled"),
    flight_departure_time DATETIME NOT NULL,
    FOREIGN KEY(airline_id) REFERENCES Airlines(airline_id),
    FOREIGN KEY(source_id) REFERENCES Airport(airport_id),
    FOREIGN KEY(destination_id) REFERENCES Airport(airport_id)
);

CREATE TABLE Booking(
    booking_id INT PRIMARY KEY,
    pass_id INT NOT NULL UNIQUE,
    flight_id INT,
    booking_status enum("Confirmed","Pending","Cancelled"),
    booking_time DATETIME,
    seat VARCHAR(3),
    booking_type enum("First Class","Business Class","Premium Economy","Economy")
);

CREATE TABLE Passenger(
    PNR INT,
    pass_name VARCHAR(20) NOT NULL,
    pass_nationality VARCHAR(20) NOT NULL,
    pass_services enum("Student","Senior Citizen","Armed Officer","Medical") NULL,
    pass_identity_number INT PRIMARY KEY,
    pass_contact INT NOT NULL UNIQUE,
    FOREIGN KEY (PNR) REFERENCES Booking(pass_id)
);
CREATE TABLE Crew(
    crew_id INT PRIMARY KEY,
    crew_name VARCHAR(50) NOT NULL,
    crew_designation VARCHAR(50) NOT NULL,
    airline_id INT,
    flight_id INT,
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id),
    FOREIGN KEY (airline_id) REFERENCES Airlines(airline_id)
);

INSERT INTO Airport VALUES
(1,"Indira Gandhi International Airport","DEL","India","Delhi"),
(2,"Chhatrapati Shivaji Maharaj International Airport","BOM","India","Maharashtra"),
(3,"Heathrow Airport","LHR","UK","London"),
(4,"John F. Kennedy International Airport","JFK","USA","New York"),
(5,"Dubai International Airport","DXB","UAE","Dubai"),
(6,"Singapore Changi Airport","SIN","Singapore","Singapore");

INSERT INTO Airlines VALUES
(1,"Air India","AI"),
(2,"Indigo","6E"),
(3,"British Airways","BA"),
(4,"American Airlines","AA"),
(5,"Emirates","Ek"),
(6,"Singapore Airlines","SQ");

INSERT INTO Flight VALUES
(101, 1, 1, 4, "On-Time", "2025-05-21 10:30:00"),
(102, 2, 2, 3, "Delayed", "2025-05-21 12:45:00"),
(103, 3, 3, 1, "Cancelled", "2025-05-21 14:00:00"),
(104, 4, 6, 4, "On-Time", "2025-05-21 15:30:00"),
(105, 5, 4, 5, "Delayed","2025-05-21 16:00:00"),
(106, 6, 6, 3, "On-Time","2025-05-21 17:45:00");

INSERT INTO Booking VALUES
(501, 1001, 101, "Pending", "2025-05-20 18:00:00", "12A", "Economy"),
(502, 1002, 102, "Confirmed", "2025-05-20 18:30:00", "5B", "First Class"),
(503, 1003, 103, "Cancelled", "2025-05-20 19:00:00", "8C", "Premium Economy"),
(504, 1004, 104, "Confirmed", "2025-05-20 19:45:00", "3D", "First Class"),
(505, 1005, 105, "Pending", "2025-05-20 20:15:00", "7E", "Business Class"),
(506, 1006, 106, "Confirmed", "2025-05-20 21:00:00", "6F", "Economy");

INSERT INTO Passenger VALUES
(1001, "Emma Johnson","Indian","Student","IND1234","9812445531"),
(1002, "Irene", "British", NULL, "UK67890", "9876543220"),
(1003, "John Doe", "American", "Medical", "USA13579", "9876543230"),
(1004, "Ali Hassan", "UAE", NULL, "UAE24680", "9876543240"),
(1005, "Hans Schmidt", "German", "Student", "GPY13579", "9876543250"),
(1006, "Carlos Martinez", "Spanish", "Senior Citizen", "ESP98765", "9876543260");

INSERT INTO Crew VALUES
(801, "Anuj Sharma", "Pilot", 1, 101),
(802, "Deepika Verma", "Cabin Crew", 1, 101),
(803, "Raashid Ahmed", "Ground Staff", 1, 101),
(804, "Himansh Munjal", "Pilot", 2, 102),
(805, "Khushi", "Cabin Crew", 2, 102),
(806, "Kabir Malik", "Ground Staff", 2, 102),
(807, "Jakes Will", "Pilot", 3, 103),
(808, "Hannah Jones", "Cabin Crew", 3, 103),
(809, "Robert Davies", "Ground Staff", 3, 103),
(810, "Henry Brown", "Pilot", 4, 104),
(811, "Olivia Smith", "Cabin Crew", 4, 104),
(812, "Carlos Rodriguez", "Ground Staff", 4, 104),
(813, "Rahul Sharma", "Pilot", 5, 105),
(814, "Fatima Sheikh", "Cabin Crew", 5, 105),
(815, "Hamid Ali", "Ground Staff", 5, 105),
(816, "Tom Wilson", "Pilot", 6, 106),
(817, 'Elena Vasquez', 'Cabin Crew', 6, 106),
(818, 'Andrew Clark', 'Ground Staff', 6, 106);