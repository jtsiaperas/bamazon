-- drop database if exists bamazonDB;
-- create database bamazonDB;
-- use bamazonDB;
-- create table products (
--   item_id varchar (10) not null,
--   product_name varchar(30) not null,
--   department_name varchar(30) not null,
--   price decimal(10,2) not null,
--   stock_quantity int(10) not null,
--   product_sales decimal (15,2) default 0,
--   primary key (item_id)
-- );
-- 
-- insert into products (item_id, product_name, department_name, price, stock_quantity) 
-- values ("HG-TP-BK","Black Teapot","Home Goods",10.99,400),
-- ("HG-SP-09", "9-inch Saucepan", "Home Goods", 19.99,150),
-- ("EL-LT-15", "15 inch Laptop", "Electronics", 199.99, 800),
-- ("MC-DJ-XL", "XL Denim Jeans", "Men's Clothes", 29.99, 300),
-- ("WC-SD-06","Summer Dress size 6","Women's Clothes",39.99,170),
-- ("FG-CK-WH", "Whole Chicken", "Frozen Goods", 5.99, 1),
-- ("FG-IC-RR", "Rocky Road Ice Cream", "Frozen Goods", 4.99, 2),
-- ("PR-WO-2P", "White Onions 2 lb bag", "Produce", 2.49, 0),
-- ("TG-PF-SL", "Star Lord Pop Figurine", "Toys and Games", 8.99,400),
-- ("TG-MP-SE", "Monopoly Simpsons Edition", "Toys and Games", 19.99, 600);
-- 
-- 
-- 
-- use bamazonDB;
-- 
-- create table departments(
--   department_id varchar(10) not null,
--   department_name varchar(30) not null,
--   over_head_costs decimal(10,2) not null,
--   primary key (department_id)
-- );
-- 
-- insert into departments (department_id,department_name,over_head_costs)
-- values ("HG", "Home Goods", 199.99),("FG", "Frozen Goods", 779.21),("PR", "Produce", 235.33),
-- ("WC", "Women's Clothes", 847.01),("MC", "Men's Clothes", 513.37),("EL", "Electronics", 300.00),
-- ("TG", "Toys and Games", 17.12);

select * from products order by department_name;
select department_id, departments.department_name, sum(products.product_sales) as product_sales, over_head_costs, product_sales - over_head_costs as total_profit from departments inner join products on departments.department_name = products.department_name group by departments.department_name;



