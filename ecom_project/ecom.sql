-- leaving a comment (Will not be run as a command)

-- DDL (Data Definition Language)
-- Used to build and modify our database (DB)

-- CREATE

CREATE DATABASE ecom;

USE ecom; -- Telling my interpreter which database to use for this script file

CREATE TABLE customer (
id INT AUTO_INCREMENT PRIMARY KEY,
customer_name VARCHAR(75) NOT NULL,
email VARCHAR(150) NULL,
phone VARCHAR(16)
);

CREATE TABLE orders (
id INT AUTO_INCREMENT PRIMARY KEY,
order_date DATE NOT NULL,
customer_id INT,
FOREIGN KEY (customer_id) REFERENCES customer(id)
);

-- ALTER

ALTER TABLE customer
ADD phone VARCHAR(16); -- adding the phone column to my customer table

ALTER TABLE customer
RENAME COLUMN customer_name TO name;

ALTER TABLE customer
DROP COLUMN phone;

ALTER TABLE customer 
ADD (phone VARCHAR(16),
address VARCHAR(150)
);

-- Another way to write it to be on one line

ALTER TABLE customer ADD (phone VARCHAR(16), address VARCHAR(150));

-- Dropping a table

CREATE TABLE droppable (  -- adding a dummy table to drop
id INT AUTO_INCREMENT PRIMARY KEY
);

DROP TABLE droppable; -- deletes the table from the system


SELECT * FROM customer;

SELECT * FROM orders;
SELECT * FROM products;
SELECT * FROM order_products;
DROP TABLE customer;



