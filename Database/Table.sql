CREATE TABLE Passenger(
    pass_id SERIAL PRIMARY KEY,
    pass_name VARCHAR(255),
    contact INT,
    pass_email VARCHAR(255),
    valid_id VARCHAR(255)
);

CREATE TABLE Complaint(
    complaint_ticket SERIAL PRIMARY KEY,
    pass_id INT,
    airline VARCHAR(255),
    pass_name VARCHAR(255),
    complain_message TEXT,
    FOREIGN KEY (pass_id) REFERENCES Passenger(pass_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Booking(
	booking_id SERIAL PRIMARY KEY,
	flight_id VARCHAR(6),
	source VARCHAR(255),
	destinatition VARCHAR(50),
	flight_date DATE
);

CREATE TABLE admin_info(
    admin_id SERIAL PRIMARY KEY,
    admin_name VARCHAR(255),
    admin_contact INT,
    admin_email VARCHAR(255),
    admin_key VARCHAR(255)
);
