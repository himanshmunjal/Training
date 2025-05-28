CREATE DATABASE todoapp;
USE todoapp;
CREATE TABLE lists(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    priority INT,
    complete BOOLEAN
);
select * from lists;