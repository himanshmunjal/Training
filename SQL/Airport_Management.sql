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

-- 1. SELECT f.flight_id, f.airline_id, f.flight_status FROM Flight AS f WHERE f.flight_status = "Delayed" OR f.flight_status = "Cancelled";

-- SELECT f.flight_status, COUNT(b.booking_id) AS Total_booking, f.flight_id FROM Flight as f JOIN  Booking AS b ON b.flight_id = f.flight_id GROUP BY f.flight_id;

-- 2. List all passengers who have booked a flight but have a service type (Student, Senior Citizen, etc.).

-- SELECT p.pass_name, p.pass_services FROM Passenger AS p where p.pass_services IS NOT NULL;

-- 3. Get the names of all airlines that operate flights departing from 'Indira Gandhi International Airport'.

-- SELECT f.flight_id, a.airline_name FROM Flight AS f JOIN Airlines AS a ON f.airline_id = a.airline_id WHERE f.source_id = 1 OR f.destination_id = 1;

-- 4. Find the total number of passengers for each nationality.

-- SELECT f.pass_nationality, COUNT(*) from Passenger AS f GROUP BY f.pass_nationality;

-- 5. Retrieve the total number of crew members working on each flight.

-- SELECT c.flight_id, COUNT(c.flight_id) AS Total_workers FROM Flight AS f JOIN Crew AS c ON c.flight_id = f.flight_id GROUP BY c.flight_id;

-- 6. Retrieve details of flights along with their source and destination airport names.

-- SELECT f.flight_id, a1.airport_name AS Source_airport, a2.airport_name AS Destination_airport FROM Flight f Join Airport a1 ON f.source_id = a1.airport_id JOIN Airport a2 ON f.destination_id = a2.airport_id;

-- 7. Find the airport with the maximum number of flights departing.

-- SELECT a.airport_id, a.airport_name, a.airpot_code, COUNT(f.source_id) AS Total_flights FROM Airport AS a JOIN Flight AS f ON f.source_id = a.airport_id GROUP BY f.flight_id ORDER BY Total_flights;

-- 8. List the top 3 flights with the highest number of confirmed bookings.

-- SELECT flight_id, count(*) AS confirmed_bookings FROM Booking WHERE booking_status = "confirmed" GROUP BY flight_id ORDER BY confirmed_bookings;

-- 9. Retrieve the crew members working on flights operated by 'British Airways'.

-- SELECT c.crew_id, c.crew_name, c.crew_designation, f.flight_id FROM Crew AS c JOIN Flight as f ON f.flight_id = c.flight_id JOIN Airlines as a ON a.airline_id = f.airline_id WHERE a.airline_name = "British Airways";

-- 10. Find the total count of bookings per booking type, ordered by the highest count.

-- SELECT booking_status, COUNT(*) AS booking_status FROM Booking GROUP BY booking_status;

-- 11. Retrieve flight details, including airline name, source airport, and destination airport, using JOIN operations.

-- SELECT f.flight_id, a.airline_name, a.airline_code, f.flight_status, f.flight_departure_time, a1.airport_name AS Source, a2.airport_name AS Destination FROM Flight AS f JOIN Airport AS a1 ON f.source_id = a1.airport_id JOIN Airport AS a2 ON f.destination_id = a2.airport_id JOIN Airlines AS a ON a.airline_id = f.airline_id;

-- 12. Find passengers who have booked flights but don’t have a registered service type.

-- SELECT pass_name, pass_identity_number FROM Passenger WHERE pass_services IS NULL;

-- 13. Get the name and contact details of all passengers who booked an First class seat.

-- SELECT pass_name, pass_contact FROM Passenger JOIN Booking ON Passenger.PNR = Booking.pass_id WHERE Booking.booking_type = "First Class";

-- 14. Find all bookings that were made within the last 24 hours.

-- SELECT b.booking_id, b.pass_id FROM Booking AS b JOIN Flight AS f ON b.flight_id = f.flight_id WHERE b.booking_time >= NOW() - INTERVAL 1 DAY

-- 15. Retrieve flights along with the assigned crew members, including pilots, cabin crew, and ground staff.

-- SELECT c.crew_id, c.crew_name, c.crew_designation, f.flight_id FROM Crew AS c JOIN Flight AS f ON c.flight_id = f.flight_id;

-- 16. List all airports along with the total number of flights departing from each.

-- SELECT a.airport_name, COUNT(f.source_id) FROM Airport AS a JOIN Flight AS f ON a.airport_id = f.source_id GROUP BY a.airport_name;

-- 17.For each booking type, get the latest booking time.

-- SELECT booking_type, MAX(booking_time) FROM Booking GROUP BY booking_type;

-- 18. Show the name of the pilot on each flight

-- SELECT flight_id, crew_name FROM Crew WHERE crew_designation = "Pilot";

-- 19. Find the contact numbers of passengers who booked a “Pending” status flight and are not from India.

-- SELECT p.pass_contact, b.booking_status, p.pass_nationality FROM Passenger AS p JOIN Booking AS b ON b.pass_id = p.PNR WHERE b.booking_status = "Pending" AND p.pass_nationality<>"Indian";

-- 20. List each airport along with how many flights depart from and arrive at it.

-- SELECT a.airport_name, (SELECT COUNT(*) FROM Flight f1 WHERE f1.source_id = a.airport_id) AS source_count, (SELECT COUNT(*) FROM Flight f2 WHERE f2.destination_id = a.airport_id) AS destination_count FROM Airport a;