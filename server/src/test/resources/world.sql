-- MySQL dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cs314
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `world`
--

DROP TABLE IF EXISTS `world`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `world` (
  `index` int(11) NOT NULL,
  `id` varchar(30) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `latitude` varchar(1000) DEFAULT NULL,
  `longitude` varchar(1000) DEFAULT NULL,
  `altitude` varchar(1000) DEFAULT NULL,
  `continent` varchar(1000) DEFAULT NULL,
  `iso_country` varchar(1000) DEFAULT NULL,
  `iso_region` varchar(1000) DEFAULT NULL,
  `municipality` varchar(1000) DEFAULT NULL,
  `scheduled_service` varchar(1000) DEFAULT NULL,
  `gps_code` varchar(1000) DEFAULT NULL,
  `iata_code` varchar(1000) DEFAULT NULL,
  `local_code` varchar(1000) DEFAULT NULL,
  `home_link` varchar(1000) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `airports_name_idx` (`name`),
  FULLTEXT KEY `airpots_municipality_idx` (`municipality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `world`
--
-- WHERE:  name='Fort Collins Downtown Airport'

LOCK TABLES `world` WRITE;
/*!40000 ALTER TABLE `world` DISABLE KEYS */;
INSERT INTO `world` VALUES (18748,'K3V5','closed','Fort Collins Downtown Airport','40.5882987976','-105.041999817','4939','NA','US','US-CO',NULL,'no','3V5',NULL,'3V5',NULL,'http://en.wikipedia.org/wiki/Fort_Collins_Downtown_Airport',NULL);
/*!40000 ALTER TABLE `world` ENABLE KEYS */;
UNLOCK TABLES;
