DROP DATABASE IF EXISTS lab_01;
CREATE DATABASE lab_01;
USE lab_01;

CREATE TABLE supplier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    contact_info VARCHAR(50) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    quantity INT,
    price FLOAT, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    supplier_id INT,
    FOREIGN KEY(supplier_id) REFERENCES supplier(id)
);

INSERT INTO supplier (name, contact_info) VALUES
("Samsung", "samsung@icloud.com"),
("Apple", "apple@contact.com"),
("Lindex", "lindex@hotmail.com"),
("Hm", "hm@info.com"),
("Starstable", "starstable@mail.com");

INSERT INTO products (name, quantity, price, supplier_id) VALUES 
("Samsung galaxy mini", 100, 3000, 1),
("Iphone 16 PRO", 50, 13000, 2),
("Cardigan", 20, 299.99, 3),
("Horse t-shirt", 5, 150, 5);

SHOW TABLES;
SELECT * FROM products;
SELECT * FROM supplier;
