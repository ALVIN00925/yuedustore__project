create database yuedustore;
use yuedustore;
create table users(
	id int auto_increment primary key,
    name varchar (50),
    email varchar (50),
    password varchar (225)
);
create table product(
	id int auto_increment primary key,
    name varchar(100),
    price int,
    stock int,
    image text
);
create table order_items(
 id int auto_increment primary key,
 order_id int,
 product_id int
);
create table orders(
 id int auto_increment primary key,
 user_id int,
 total int,
 create_at timestamp default current_timestamp
 
);