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
-- Table structure for table `continent`
--

DROP TABLE IF EXISTS `continent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `continent` (
  `index` int(8) NOT NULL,
  `id` varchar(3) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `continents_id_idx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `continent`
--
-- WHERE:  name='Africa'

LOCK TABLES `continent` WRITE;
/*!40000 ALTER TABLE `continent` DISABLE KEYS */;
INSERT INTO `continent` VALUES (400001,'AF','Africa','https://en.wikipedia.org/wiki/Africa');
/*!40000 ALTER TABLE `continent` ENABLE KEYS */;
UNLOCK TABLES;
