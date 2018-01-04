-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `app` DEFAULT CHARACTER SET utf8 ;
USE `app` ;

-- -----------------------------------------------------
-- Table `app`.`tblcontractor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`tblcontractor` (
  `idcontractor` INT(11) NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(45) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcontractor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `app`.`tblcustomer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`tblcustomer` (
  `idcustomer` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `address_line_1` VARCHAR(45) NULL DEFAULT NULL,
  `address_line_2` VARCHAR(45) NULL DEFAULT NULL,
  `address_line_3` VARCHAR(45) NULL DEFAULT NULL,
  `postcode` VARCHAR(8) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcustomer`))
ENGINE = InnoDB
AUTO_INCREMENT = 72
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `app`.`tbljob`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`tbljob` (
  `idjob` INT(11) NOT NULL AUTO_INCREMENT,
  `job_type` VARCHAR(45) NULL DEFAULT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `quote_price` DOUBLE NULL DEFAULT NULL,
  `expenses` DOUBLE NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `paid` TINYINT(4) NULL DEFAULT NULL,
  `idcustomer` INT(11) NULL DEFAULT NULL,
  `idcontractor` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idjob`),
  INDEX `idcustomer_idx` (`idcustomer` ASC),
  INDEX `idcontractor_idx` (`idcontractor` ASC),
  CONSTRAINT `idcontractor`
    FOREIGN KEY (`idcontractor`)
    REFERENCES `app`.`tblcontractor` (`idcontractor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idcustomer`
    FOREIGN KEY (`idcustomer`)
    REFERENCES `app`.`tblcustomer` (`idcustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `app`.`tblappointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`tblappointment` (
  `idappointment` INT(11) NOT NULL AUTO_INCREMENT,
  `datetime` DATETIME NULL DEFAULT NULL,
  `idjob` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idappointment`),
  INDEX `idjob_idx` (`idjob` ASC),
  CONSTRAINT `idjob1`
    FOREIGN KEY (`idjob`)
    REFERENCES `app`.`tbljob` (`idjob`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `app`.`tblpart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`tblpart` (
  `idpart` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `cost_per_unit` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`idpart`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `app`.`tbljobitem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`tbljobitem` (
  `idjob` INT(11) NOT NULL,
  `idpart` INT(11) NOT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `labour_hours` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`idjob`, `idpart`),
  INDEX `idjob_idx` (`idjob` ASC),
  INDEX `idpart_idx` (`idpart` ASC),
  CONSTRAINT `idjob`
    FOREIGN KEY (`idjob`)
    REFERENCES `app`.`tbljob` (`idjob`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idpart`
    FOREIGN KEY (`idpart`)
    REFERENCES `app`.`tblpart` (`idpart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
