drop database if exists bamazonDB;
create database bamazonDB;
use bamazonDB;
create table products (
  item_id varchar (10) not null,
  product_name varchar(30) not null,
  department_name varchar(30) not null,
  price decimal(10,2) not null,
  stock_quantity int(10) not null,
  primary key (item_id)
);
insert into products (item_id, product_name, department_name, price, stock_quantity) 
values ("HG-TP-BK","Black Teapot","Home Goods",10.99,10),
("HG-SP-09", "9-inch Saucepan", "Home Goods", 19.99,15),
("EL-LT-15", "15 inch Laptop", "Electronics", 199.99, 8),
("MC-DJ-XL", "XL Denim Jeans", "Men's Clothes", 29.99, 3),
("WC-SD-06","Summer Dress size 6","Women's Clothes",39.99,17),
("FG-CK-WH", "Whole Chicken", "Frozen Goods", 5.99, 1),
("FG-IC-RR", "Rocky Road Ice Cream", "Frozen Goods", 4.99, 2),
("PR-WO-2P", "White Onions 2 lb bag", "Produce", 2.49, 0),
("TG-PF-SL", "Star Lord Pop Figurine", "Toys and Games", 8.99,4),
("TG-MP-SE", "Monopoly Simpsons Edition", "Toys and Games", 19.99, 6);

select * from products;