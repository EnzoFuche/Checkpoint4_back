/* Replace with your SQL commands */

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR (100),
    `email` VARCHAR (155),
    `password` VARCHAR (100),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;