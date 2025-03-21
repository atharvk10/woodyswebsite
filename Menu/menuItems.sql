CREATE DATABASE menu;

CREATE TABLE menu_table (
    ItemName varchar(255),
    ItemPrice DECIMAL (5, 2),
    ItemDescription TEXT,
    ItemImageURL VARCHAR(255)
);

INSERT INTO menu_table(ItemName, ItemPrice, ItemDescription, ItemImageURL) 
VALUES 

('Egg and Cheese Sandwich', 5.75, ' ', ' '), 
('Egg Sandwich', 5.75 ,' ', ' '),
('Meat Sandwich', 6.50 ,' ', ' '), 
('Pork Bacon Cheese Sandwich', 6.00, ' ', ' '),
('Pork Bacon Egg Cheese Sandwich', 6.50, ' ', ' '),
('Pork Bacon Egg Sandwich', 6.00, ' ', ' '),
('Pork Roll Cheese Sandwich', 6.00, ' ', ' '),
('Pork Roll Egg Cheese Sandwich', 6.50, ' ', ' '),
('Pork Roll Egg Sandwich', 6.00, ' ', ' '),
('Pork Sausage Cheese Sandwich', 6.00, ' ', ' '),
('Pork Sausage Egg Cheese Sandwich', 6.50, ' ', ' '),
('Pork Sausage Egg Sandwich', 6.00, ' ', ' '),
('Turkey Bacon Cheese Sandwich', 6.00, ' ', ' '),
('Turkey Bacon Egg Cheese Sandwich', 6.50, ' ', ' '),
('Turkey Bacon Egg Sandwich', 6.00, ' ', ' ')