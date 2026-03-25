-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: game_library
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartrows`
--

DROP TABLE IF EXISTS `cartrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartrows` (
  `cartId` int NOT NULL,
  `gameId` int NOT NULL,
  `amount` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cartId`,`gameId`),
  UNIQUE KEY `CartRows_gameId_cartId_unique` (`cartId`,`gameId`),
  KEY `gameId` (`gameId`),
  CONSTRAINT `cartrows_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cartrows_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartrows`
--

LOCK TABLES `cartrows` WRITE;
/*!40000 ALTER TABLE `cartrows` DISABLE KEYS */;
INSERT INTO `cartrows` VALUES (1,5,1,'2026-03-23 20:05:24','2026-03-23 20:05:24'),(1,7,1,'2026-03-23 20:05:24','2026-03-23 20:05:24'),(1,8,1,'2026-03-23 20:05:24','2026-03-23 20:05:24'),(2,15,1,'2026-03-23 21:36:58','2026-03-23 21:36:58'),(3,13,1,'2026-03-24 12:10:56','2026-03-24 12:10:56'),(3,14,1,'2026-03-24 12:10:56','2026-03-24 12:10:56'),(3,15,1,'2026-03-24 12:10:56','2026-03-24 12:10:56'),(4,13,1,'2026-03-24 12:11:08','2026-03-24 12:11:08'),(4,14,1,'2026-03-24 12:11:08','2026-03-24 12:11:08'),(4,15,1,'2026-03-24 12:11:07','2026-03-24 12:11:07'),(5,13,1,'2026-03-24 12:12:31','2026-03-24 12:12:31'),(5,14,1,'2026-03-24 12:12:31','2026-03-24 12:12:31'),(5,15,1,'2026-03-24 12:12:30','2026-03-24 12:12:30'),(6,8,1,'2026-03-24 12:16:09','2026-03-24 12:16:09'),(6,12,1,'2026-03-24 12:16:10','2026-03-24 12:16:10'),(6,15,1,'2026-03-24 12:16:07','2026-03-24 12:16:07'),(7,4,1,'2026-03-24 12:16:24','2026-03-24 12:16:24'),(7,5,1,'2026-03-24 12:16:24','2026-03-24 12:16:24'),(7,8,1,'2026-03-24 12:16:25','2026-03-24 12:16:25'),(8,14,1,'2026-03-24 12:36:37','2026-03-24 12:36:37'),(8,15,1,'2026-03-24 12:36:36','2026-03-24 12:36:36'),(9,12,1,'2026-03-25 16:33:32','2026-03-25 16:33:32'),(9,15,1,'2026-03-25 16:33:31','2026-03-25 16:33:31'),(9,17,1,'2026-03-25 16:33:30','2026-03-25 16:33:30'),(10,1,1,'2026-03-25 16:35:32','2026-03-25 16:35:32'),(10,4,1,'2026-03-25 16:35:32','2026-03-25 16:35:32'),(10,5,1,'2026-03-25 16:35:30','2026-03-25 16:35:30'),(11,17,1,'2026-03-25 16:35:42','2026-03-25 16:35:42'),(12,14,1,'2026-03-25 16:39:08','2026-03-25 16:39:08');
/*!40000 ALTER TABLE `cartrows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `payed` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_10` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_12` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_16` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_18` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_19` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_20` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_21` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_22` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_23` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_24` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_25` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_26` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_27` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_28` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_29` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_30` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_31` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_32` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_33` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_34` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_35` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_36` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_37` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_38` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_39` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_40` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_41` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_42` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_9` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,1,'2026-03-23 12:35:01','2026-03-24 12:10:41'),(2,4,0,'2026-03-23 21:36:58','2026-03-23 21:36:58'),(3,1,1,'2026-03-24 12:10:56','2026-03-24 12:10:58'),(4,1,1,'2026-03-24 12:11:07','2026-03-24 12:11:11'),(5,1,1,'2026-03-24 12:12:30','2026-03-24 12:12:33'),(6,1,1,'2026-03-24 12:16:07','2026-03-24 12:16:11'),(7,1,1,'2026-03-24 12:16:24','2026-03-24 12:16:27'),(8,1,0,'2026-03-24 12:36:36','2026-03-24 12:36:36'),(9,6,1,'2026-03-25 16:33:30','2026-03-25 16:34:18'),(10,7,1,'2026-03-25 16:35:30','2026-03-25 16:35:38'),(11,7,1,'2026-03-25 16:35:42','2026-03-25 16:35:44'),(12,6,1,'2026-03-25 16:39:08','2026-03-25 16:39:09');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `percentage` int NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `code_2` (`code`),
  UNIQUE KEY `code_3` (`code`),
  UNIQUE KEY `code_4` (`code`),
  UNIQUE KEY `code_5` (`code`),
  UNIQUE KEY `code_6` (`code`),
  UNIQUE KEY `code_7` (`code`),
  UNIQUE KEY `code_8` (`code`),
  UNIQUE KEY `code_9` (`code`),
  UNIQUE KEY `code_10` (`code`),
  UNIQUE KEY `code_11` (`code`),
  UNIQUE KEY `code_12` (`code`),
  UNIQUE KEY `code_13` (`code`),
  UNIQUE KEY `code_14` (`code`),
  UNIQUE KEY `code_15` (`code`),
  UNIQUE KEY `code_16` (`code`),
  UNIQUE KEY `code_17` (`code`),
  UNIQUE KEY `code_18` (`code`),
  UNIQUE KEY `code_19` (`code`),
  UNIQUE KEY `code_20` (`code`),
  UNIQUE KEY `code_21` (`code`),
  UNIQUE KEY `code_22` (`code`),
  UNIQUE KEY `code_23` (`code`),
  UNIQUE KEY `code_24` (`code`),
  UNIQUE KEY `code_25` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,'GAMER10',10,1,'2026-03-24 12:31:58','2026-03-24 12:31:58'),(2,'GAMER20',20,1,'2026-03-24 12:32:11','2026-03-24 12:32:11'),(3,'HALF50',50,1,'2026-03-24 12:32:17','2026-03-24 12:32:17');
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `releaseYear` int DEFAULT NULL,
  `image` text,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rating` int DEFAULT NULL,
  `platformId` int DEFAULT NULL,
  `genreId` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `originalPrice` double DEFAULT NULL,
  `salePercentage` int DEFAULT NULL,
  `onSale` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `platformId` (`platformId`),
  KEY `genreId` (`genreId`),
  CONSTRAINT `Games_genreId_foreign_idx` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_10` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_11` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_12` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_13` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_14` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_15` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_16` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_17` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_18` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_19` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_20` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_21` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_22` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_23` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_24` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_25` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_26` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_27` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_28` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_29` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_3` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_30` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_31` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_32` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_33` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_34` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_35` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_36` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_37` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_38` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_39` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_4` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_40` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_41` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_42` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_43` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_44` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_45` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_46` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_47` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_48` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_49` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_5` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_50` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_51` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_52` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_53` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_54` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_55` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_56` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_57` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_58` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_59` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_6` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_60` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_61` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_62` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_63` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_64` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_65` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_66` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_67` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_68` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_69` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_7` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_70` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_71` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_72` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_73` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_74` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_75` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_76` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_77` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_78` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_79` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_8` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_80` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_81` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_82` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_83` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_84` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_85` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_86` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_87` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_88` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_89` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_9` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_90` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_91` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_92` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_93` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_94` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Games_platformId_foreign_idx` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'The Witcher 3 - The wild hunt ','Pausat',2015,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstore-images.s-microsoft.com%2Fimage%2Fapps.53717.65858607118306853.39ed2a08-df0d-4ae1-aee0-c66ffb783a34.80ba72da-abfb-4af6-81f2-a443d12fb870&f=1&nofb=1&ipt=a20bb44db4478e4619bde6cf9911f6d4bb5d61d92d81c483f033922ffd265163','Open world RPG adventure','2026-03-21 18:26:25','2026-03-23 12:50:54',NULL,2,3,300,NULL,NULL,0),(4,'deadlock','Spelar',NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-strapi.deadlock.coach%2Fdeadlock_pc_game_steam_cover_4467759ec6.jpg&f=1&nofb=1&ipt=7b4f905110218438917e93bf5ec57c8f88255fca7d182c5d8911bcca7b01f72d','FPS spel för åldrar 12+','2026-03-21 19:55:20','2026-03-25 10:02:20',NULL,1,4,100,NULL,NULL,0),(5,'FiFA 26','Klar',NULL,'https://www.fifaultimateteam.it/wp-content/uploads/2025/08/Cover-Bellingham-Musiala-Standard-EA-FC-26.webp','Fotbollspel för åldrar 8+','2026-03-22 09:34:56','2026-03-25 10:02:06',1,2,2,200,NULL,NULL,0),(7,'Valorant','Spelar',NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.--01k4rNVih9Tc7fG8xl9wHaEK%3Fpid%3DApi&f=1&ipt=453482b3e8eeb690438d24c42470695fb1257cc81ae2ac16862d50f55d108edb&ipo=images','FPS spel för åldrar 12+','2026-03-22 16:59:41','2026-03-25 10:06:12',NULL,1,4,300,NULL,NULL,0),(8,'NHL 26','Planerar',NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.NRWIAeJkaZAvp1owqAEM1QHaLH%3Fpid%3DApi&f=1&ipt=91e83b860399c10e9f85ca546d0265d154a5e6dc18e510f41c0daa589572554b&ipo=images','Hockey sport spel för både unga och vuxna ','2026-03-23 15:03:41','2026-03-25 10:00:33',NULL,2,2,500,NULL,48,1),(12,'Counter strike 2',NULL,NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.CXssb09l_NROwY3iGXyFqQHaEK%3Fpid%3DApi&f=1&ipt=15832ed42d7bed3e6a53762faa101bab45e08141d3a81c8b4656a3feb69e0eb9&ipo=images','FPS spel för åldrar 18+','2026-03-23 20:45:29','2026-03-25 10:00:14',NULL,1,4,200,NULL,NULL,0),(13,'Among us ',NULL,NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.mdxkBtY_smSWmzh7CJ-DHAHaEK%3Fpid%3DApi&f=1&ipt=c227b7c3138590cd9a420f2c3f146b90d7a40e442bc87ae1d43c426ff110e287&ipo=images','stratagy och rollspel för åldrar 10+','2026-03-23 20:49:18','2026-03-25 09:58:57',NULL,1,6,275,NULL,NULL,0),(14,'liar\'s Bar',NULL,NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%2Fid%2FOIP.iaYBxOh0fQ94zS6pAu1RBQHaLH%3Fpid%3DApi&f=1&ipt=6d0e188551b578ad0bc49256b4c9a6c4f3b5d2d7928a414525b7bac978672ee2&ipo=images','Strategi spel för åldrar 15+','2026-03-23 20:51:55','2026-03-25 09:59:40',NULL,1,6,150,NULL,NULL,0),(15,'Minecraft',NULL,NULL,'https://dopest.se/_next/image/?url=https%3A%2F%2Fwp.dopest.se%2Fwp-content%2Fuploads%2F2024%2F05%2Fminecraft-history-first-version-ever-timeline-scaled.jpeg&w=3840&q=75','Minecraft för unga och gammla','2026-03-23 21:36:23','2026-03-25 09:55:49',NULL,1,5,300,NULL,50,1),(17,'Elden Ring',NULL,NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2023%2F05%2Felden-ring-vyke-cover-1.jpg&f=1&nofb=1&ipt=ca2fad115e699a0a804ec9d558e48388f3b2cf704ae6ab3bb4e2cca8bb591bf3','Fantasy action RPG','2026-03-25 10:04:56','2026-03-25 10:04:56',NULL,2,3,700,NULL,80,1);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action','2026-03-22 17:56:13','2026-03-22 17:56:13'),(2,'Sport','2026-03-22 17:56:13','2026-03-22 17:56:13'),(3,'RPG','2026-03-22 17:56:13','2026-03-22 17:56:13'),(4,'FPS','2026-03-22 17:56:13','2026-03-22 17:56:13'),(5,'Adventure','2026-03-22 17:56:13','2026-03-22 17:56:13'),(6,'Strategy','2026-03-22 17:56:13','2026-03-22 17:56:13'),(7,'Horror','2026-03-22 17:56:13','2026-03-22 17:56:13'),(8,'Simulation','2026-03-22 17:56:13','2026-03-22 17:56:13');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (1,'PC','2026-03-22 17:56:13','2026-03-22 17:56:13'),(2,'Xbox','2026-03-22 17:56:13','2026-03-22 17:56:13'),(3,'PlayStation 5','2026-03-22 17:56:13','2026-03-22 17:56:13'),(4,'PlayStation 4','2026-03-22 17:56:13','2026-03-22 17:56:13'),(5,'Nintendo Switch','2026-03-22 17:56:13','2026-03-22 17:56:13'),(6,'Mobile','2026-03-22 17:56:13','2026-03-22 17:56:13');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameId` int NOT NULL,
  `rating` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gameId` (`gameId`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_10` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_11` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_12` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_13` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_14` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_15` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_16` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_17` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_18` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_19` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_20` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_21` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_22` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_23` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_24` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_25` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_26` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_27` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_28` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_29` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_30` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_31` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_32` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_33` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_34` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_35` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_36` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_37` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_38` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_39` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_4` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_40` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_41` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_42` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_5` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_6` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_7` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_8` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_9` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,7,4,'2026-03-23 12:37:31','2026-03-23 12:37:31'),(3,12,3,'2026-03-23 20:45:40','2026-03-23 20:45:40'),(4,15,4,'2026-03-24 22:14:03','2026-03-24 22:14:03'),(5,15,4,'2026-03-24 22:14:10','2026-03-24 22:14:10'),(6,15,1,'2026-03-24 22:14:14','2026-03-24 22:14:14'),(7,15,5,'2026-03-24 22:14:16','2026-03-24 22:14:16'),(8,4,4,'2026-03-25 10:02:25','2026-03-25 10:02:25'),(9,17,5,'2026-03-25 10:05:09','2026-03-25 10:05:09');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text,
  `rating` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gameId` (`gameId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_10` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_11` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_12` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_13` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_14` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_15` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_16` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_17` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_18` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_19` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_20` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_21` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_22` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_23` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_24` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_25` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_26` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_27` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_28` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_29` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_30` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_31` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_32` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_33` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_34` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_35` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_36` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_37` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_38` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_39` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_4` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_40` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_41` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_42` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_43` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_44` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_45` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_46` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_47` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_5` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_6` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_7` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_8` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_9` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (4,15,'Samuel','Roligt spel',3,'2026-03-24 17:51:16','2026-03-24 17:51:16'),(5,7,'Årets spel??','Wow detta spel är otroligt bra',5,'2026-03-25 10:01:45','2026-03-25 10:01:45'),(6,17,'Årets spel helt klart','Wow detta är 100% bästa spelet jag har kört någonsin',5,'2026-03-25 10:05:34','2026-03-25 10:05:34');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storereviews`
--

DROP TABLE IF EXISTS `storereviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storereviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storereviews`
--

LOCK TABLES `storereviews` WRITE;
/*!40000 ALTER TABLE `storereviews` DISABLE KEYS */;
INSERT INTO `storereviews` VALUES (1,'Samuel K.',5,'Wow vilken bra sida','2026-03-24 22:26:24','2026-03-24 22:26:24'),(2,'Freddan L.',4,'Den e najs ','2026-03-24 22:26:50','2026-03-24 22:26:50');
/*!40000 ALTER TABLE `storereviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`),
  UNIQUE KEY `email_37` (`email`),
  UNIQUE KEY `email_38` (`email`),
  UNIQUE KEY `email_39` (`email`),
  UNIQUE KEY `email_40` (`email`),
  UNIQUE KEY `email_41` (`email`),
  UNIQUE KEY `email_42` (`email`),
  UNIQUE KEY `email_43` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Samuel','Karlsson','samuel@mail.com','2026-03-23 12:28:54','2026-03-25 09:54:08',NULL,'user'),(2,'Joachim','Karlsson','Joachim.karlsson@gmail.com','2026-03-23 20:31:12','2026-03-23 20:31:12',NULL,'user'),(3,'Olle','Österdahl','olle.ost@gamil.com','2026-03-23 20:31:41','2026-03-25 09:53:22',NULL,'user'),(4,'Hannah','Karlsson','hannah.karlsson01@gmai.com','2026-03-23 20:32:23','2026-03-23 20:32:23',NULL,'user'),(5,'William','hedrum','william.hedpung@gmail.com','2026-03-23 20:32:56','2026-03-23 20:32:56',NULL,'user'),(6,'samuel','karlsson','samuel.karlsson00@gmail.com','2026-03-25 16:21:50','2026-03-25 16:21:50','$2b$10$D2iDixPHHqxuNYiWWjA.mefc.eNCDR7MlNqM0glhcXyBQzZcbsZB2','user'),(7,'Stefan','Sten','stefan.sten@gmail.com','2026-03-25 16:35:21','2026-03-25 16:35:21','$2b$10$zE7wEAQKKERXuSqnltsOWOtc4ENg9taeex72xXghoc5IHKc5rc3Yy','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-25 17:42:29
