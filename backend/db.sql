drop database if exists education;
create database education  default character set utf8 ;
use education;

create table `user` (
    id varchar(50) primary key,
    name varchar(50) not null,
    phone varchar(20) not null,
    password varchar(50) not null,
    image varchar(100) null,
    create_time bigint,
    update_time bigint
);

create table `driver` (
    driver_id bigint primary key,
    username varchar(50)  not null,
    password varchar(42) not null,
    phone varchar(32)  unique key,
    email varchar(32)  not null,
    rating float not null,
    create_time bigint null,
    update_time bigint null
);

create table `rating` (
    review_id bigint primary key,
    driver_id bigint not null,
    user_id varchar(50) not null,
    rating float not null,
    comment varchar(255) not null,
    timestamp bigint not null
);