CREATE DATABASE register_user;
use register_user;

CREATE TABLE  IF NOT EXISTS `users` (
     `id`INT(10)  AUTO_INCREMENT ,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `date` VARCHAR(50) NOT NULL,
     `sex` VARCHAR(50) NOT NULL,
    `hobbies` VARCHAR(256) NOT NULL,
     `country` VARCHAR(50) NOT NULL,
     `filename` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`id`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;