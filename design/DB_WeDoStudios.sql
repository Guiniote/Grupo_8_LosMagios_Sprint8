-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema wedostudio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wedostudio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wedostudio` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`avatars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`avatars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `firstName` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `adress` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `telephone` VARCHAR(45) NULL,
  `avatars_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_avatars1_idx` (`avatars_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_avatars1`
    FOREIGN KEY (`avatars_id`)
    REFERENCES `mydb`.`avatars` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(200) NULL,
  `keywords` VARCHAR(200) NULL,
  `image` VARCHAR(200) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `model` VARCHAR(200) NULL,
  `description` TEXT NULL,
  `specs` TEXT NULL,
  `keywords` TEXT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` INT NULL,
  `stock` INT NOT NULL,
  `stock_min` INT NOT NULL,
  `stock_max` INT NOT NULL,
  `categories_id` INT NOT NULL,
  `brands_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_categories_idx` (`categories_id` ASC) VISIBLE,
  INDEX `fk_products_brands1_idx` (`brands_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`categories_id`)
    REFERENCES `mydb`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_brands1`
    FOREIGN KEY (`brands_id`)
    REFERENCES `mydb`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(200) NULL,
  `keywords` VARCHAR(200) NULL,
  `image` VARCHAR(200) NULL,
  `duration` INT NOT NULL,
  `level` VARCHAR(200) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` INT NULL,
  `initial_capacity` INT NOT NULL,
  `minimal_capacity` INT NOT NULL,
  `actual_capacity` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`states` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_number` INT NOT NULL,
  `total` DECIMAL NOT NULL,
  `date` DATE NULL,
  `users_id` INT NOT NULL,
  `states_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_orders_states1_idx` (`states_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_states1`
    FOREIGN KEY (`states_id`)
    REFERENCES `mydb`.`states` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`orderDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`orderDetails` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `subtotal` DECIMAL NOT NULL,
  `orders_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  `services_id` INT NOT NULL,
  `courses_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orderDetails_orders1_idx` (`orders_id` ASC) VISIBLE,
  INDEX `fk_orderDetails_products1_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_orderDetails_services1_idx` (`services_id` ASC) VISIBLE,
  INDEX `fk_orderDetails_courses1_idx` (`courses_id` ASC) VISIBLE,
  CONSTRAINT `fk_orderDetails_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `mydb`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderDetails_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `mydb`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderDetails_services1`
    FOREIGN KEY (`services_id`)
    REFERENCES `mydb`.`services` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderDetails_courses1`
    FOREIGN KEY (`courses_id`)
    REFERENCES `mydb`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_images_products1_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `mydb`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `wedostudio` ;

-- -----------------------------------------------------
-- Table `wedostudio`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`brands` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`courses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `keywords` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `duration` INT(11) NOT NULL,
  `level` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `discount` INT(11) NULL DEFAULT NULL,
  `initialCapacity` INT(11) NOT NULL,
  `minimalCapacity` INT(11) NOT NULL,
  `actualCapacity` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `model` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `specs` TEXT NULL DEFAULT NULL,
  `keywords` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `discount` INT(11) NULL DEFAULT NULL,
  `stock` INT(11) NOT NULL,
  `stockMin` INT(11) NOT NULL,
  `stockMax` INT(11) NOT NULL,
  `categoryId` INT(11) NOT NULL,
  `brandId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `categoryId` (`categoryId` ASC) VISIBLE,
  INDEX `brandId` (`brandId` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`categoryId`)
    REFERENCES `wedostudio`.`categories` (`id`),
  CONSTRAINT `products_ibfk_2`
    FOREIGN KEY (`brandId`)
    REFERENCES `wedostudio`.`brands` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 47
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `productId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productId` (`productId` ASC) VISIBLE,
  CONSTRAINT `images_ibfk_1`
    FOREIGN KEY (`productId`)
    REFERENCES `wedostudio`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 73
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`migrations` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `wedostudio`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(255) NULL DEFAULT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`states` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `orderNumber` INT(11) NOT NULL,
  `total` DECIMAL(10,0) NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `userId` INT(11) NOT NULL,
  `stateId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  INDEX `stateId` (`stateId` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `wedostudio`.`users` (`id`),
  CONSTRAINT `orders_ibfk_2`
    FOREIGN KEY (`stateId`)
    REFERENCES `wedostudio`.`states` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`services` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `keywords` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `discount` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`orderdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`orderdetails` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity` INT(11) NOT NULL,
  `subtotal` DECIMAL(10,0) NOT NULL,
  `orderId` INT(11) NOT NULL,
  `productId` INT(11) NOT NULL,
  `serviceId` INT(11) NOT NULL,
  `courseId` INT(11) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `orderId` (`orderId` ASC) VISIBLE,
  INDEX `productId` (`productId` ASC) VISIBLE,
  INDEX `serviceId` (`serviceId` ASC) VISIBLE,
  INDEX `courseId` (`courseId` ASC) VISIBLE,
  CONSTRAINT `orderdetails_ibfk_1`
    FOREIGN KEY (`orderId`)
    REFERENCES `wedostudio`.`orders` (`id`),
  CONSTRAINT `orderdetails_ibfk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `wedostudio`.`products` (`id`),
  CONSTRAINT `orderdetails_ibfk_3`
    FOREIGN KEY (`serviceId`)
    REFERENCES `wedostudio`.`services` (`id`),
  CONSTRAINT `orderdetails_ibfk_4`
    FOREIGN KEY (`courseId`)
    REFERENCES `wedostudio`.`courses` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wedostudio`.`seeds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wedostudio`.`seeds` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
