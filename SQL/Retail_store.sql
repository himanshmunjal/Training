CREATE DATABASE Retail_Store;
USE Retail_Store;

CREATE TABLE Customers(
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    customer_email VARCHAR(50) NOT NULL,
    customer_phone VARCHAR(15) UNIQUE NOT NULL,
    customer_city VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    category VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_Items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    item_total DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    position VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    hire_date DATE NOT NULL
);

INSERT INTO Customers VALUES
(1, "John Doe", "john@example.com", "9876543210", "New York"),
(2, "Alice Brown", "alice@example.com", "9876543220", "Chicago"),
(3, "David Smith", "david@example.com", "9876543230", "San Francisco"),
(4, "Emily Watson", "emily@example.com", "9876543240", "Los Angeles");

INSERT INTO Products VALUES
(101, "Laptop", "Electronics", 1200.00, 10),
(102, "Smartphone", "Electronics", 800.00, 20),
(103, "Headphones", "Accessories", 100.00, 50),
(104, "Desk Chair", "Furniture", 250.00, 15);

INSERT INTO Orders VALUES
(5001, 1, "2025-05-20 14:00:00", 1300.00),
(5002, 2, "2025-05-20 15:30:00", 900.00),
(5003, 3, "2025-05-21 10:00:00", 350.00);

INSERT INTO Order_Items VALUES
(9001, 5001, 101, 1, 1200.00),
(9002, 5001, 103, 1, 100.00),
(9003, 5002, 102, 1, 800.00),
(9004, 5002, 103, 1, 100.00),
(9005, 5003, 104, 1, 250.00),
(9006, 5003, 103, 1, 100.00);

INSERT INTO Employees VALUES
(2001, "Robert Williams", "Store Manager", 55000.00, "2023-06-01"),
(2002, "Sophia Johnson", "Sales Representative", 40000.00, "2024-03-15"),
(2003, "Michael Davis", "Cashier", 30000.00, "2024-09-10");

-- Retrieve all customers who are from "New York".

SELECT * FROM Customers WHERE customer_city = "New York";

-- Find the total number of products available in each category.

SELECT category, COUNT(*) FROM Products GROUP BY category;

-- List all orders placed in the last 7 days.

SELECT order_id, order_date FROM ORDERS WHERE ABS(DAYSDIFF(CURDATE(),order_date))<7;

-- Retrieve the total number of items ordered for each product.

SELECT product_id, SUM(quantity) FROM Order_Items GROUP BY product_id;

-- Get the name and salary of employees who earn more than $35,000.

SELECT * FROM Employees WHERE salary > 35000;

-- Find all customers who have placed at least one order.

SELECT c.customer_id, c.customer_name, COUNT(o1.quantity) AS Quantity_ordered FROM Orders AS o JOIN Order_Items AS o1 ON o.order_id = o1.order_id JOIN Customers AS c ON o.customer_id = c.customer_id GROUP BY customer_id HAVING Quantity_ordered>1;

-- Get the details of products that are currently out of stock. //

SELECT product_name, product_id FROM Products WHERE stock_quantity - COALESCE((SELECT SUM(quantity) FROM Order_Items WHERE Order_Items.product_id = Products.product_id),0)=0;

-- List all customers and their total order amount.
 
SELECT c.customer_id, c.customer_name, o.total_amount FROM Customers as c JOIN Orders AS o ON c.customer_id = o.customer_id; 

-- Retrieve all employees who were hired after '2024-01-01'.

SELECT employee_id, employee_name, hire_date FROM Employees WHERE hire_date > "2024-01-01";

-- Find all orders that contain more than one product.

SELECT order_id, COUNT(order_id) AS Items_ordered FROM Order_Items GROUP BY order_id HAVING Items_ordered > 1;
