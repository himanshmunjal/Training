CREATE DATABASE Testing;
USE Testing;
CREATE TABLE movies (
    id VARCHAR(20) PRIMARY KEY,
    isbn VARCHAR(20),
    title VARCHAR(255),
    director_fname VARCHAR(50),
    director_lname VARCHAR(50)
);