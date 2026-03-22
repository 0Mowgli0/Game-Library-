-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: game_library
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `postId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_post` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Samma hÔö£├▒r!',1,2,'2026-03-21 18:26:25','2026-03-21 18:26:25'),(2,'Elden Ring Ôö£├▒r grymt!',2,1,'2026-03-21 18:26:25','2026-03-21 18:26:25');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `platformId` (`platformId`),
  KEY `genreId` (`genreId`),
  CONSTRAINT `Games_genreId_foreign_idx` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_3` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_4` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_5` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `games_ibfk_6` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Games_platformId_foreign_idx` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'The Witcher 3 - The wild hunt ','Pausat',2015,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstore-images.s-microsoft.com%2Fimage%2Fapps.53717.65858607118306853.39ed2a08-df0d-4ae1-aee0-c66ffb783a34.80ba72da-abfb-4af6-81f2-a443d12fb870&f=1&nofb=1&ipt=a20bb44db4478e4619bde6cf9911f6d4bb5d61d92d81c483f033922ffd265163','Open world RPG adventure','2026-03-21 18:26:25','2026-03-22 17:13:08',NULL,2,3),(3,'Elden Ring','Klar',2022,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.gamerantimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2023%2F05%2Felden-ring-vyke-cover-1.jpg&f=1&nofb=1&ipt=ca2fad115e699a0a804ec9d558e48388f3b2cf704ae6ab3bb4e2cca8bb591bf3','Fantasy action RPG','2026-03-21 18:26:25','2026-03-22 17:16:57',5,2,3),(4,'deadlock','Spelar',NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-strapi.deadlock.coach%2Fdeadlock_pc_game_steam_cover_4467759ec6.jpg&f=1&nofb=1&ipt=7b4f905110218438917e93bf5ec57c8f88255fca7d182c5d8911bcca7b01f72d','kul spel tycker jag','2026-03-21 19:55:20','2026-03-22 17:12:54',NULL,1,4),(5,'FiFA 26','Klar',NULL,'https://www.fifaultimateteam.it/wp-content/uploads/2025/08/Cover-Bellingham-Musiala-Standard-EA-FC-26.webp','Fifa 26 ├ñr ett fotbollsspel f├Âr barn och vuxna ','2026-03-22 09:34:56','2026-03-22 18:00:18',1,2,2),(7,'Valornat','Spelar',NULL,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.--01k4rNVih9Tc7fG8xl9wHaEK%3Fpid%3DApi&f=1&ipt=453482b3e8eeb690438d24c42470695fb1257cc81ae2ac16862d50f55d108edb&ipo=images','Snabbt fps spel ','2026-03-22 16:59:41','2026-03-22 18:00:46',NULL,1,4);
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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `fk_posts_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Mina favoritspel','Jag gillar RPG och indie-spel mest.',1,'2026-03-21 18:26:25','2026-03-21 18:26:25'),(2,'Vad spelar ni nu?','Jag spelar just nu Elden Ring.',2,'2026-03-21 18:26:25','2026-03-21 18:26:25');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posttags`
--

DROP TABLE IF EXISTS `posttags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posttags` (
  `postId` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`postId`,`tagId`),
  KEY `fk_posttags_tag` (`tagId`),
  CONSTRAINT `fk_posttags_post` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_posttags_tag` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posttags`
--

LOCK TABLES `posttags` WRITE;
/*!40000 ALTER TABLE `posttags` DISABLE KEYS */;
INSERT INTO `posttags` VALUES (1,1),(2,2),(1,3);
/*!40000 ALTER TABLE `posttags` ENABLE KEYS */;
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
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_4` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,7,'valo recension av samuel','Amen dehÔö£├▒r Ôö£├▒r bra ',4,'2026-03-22 17:00:18','2026-03-22 17:00:18');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'RPG','2026-03-21 18:26:25','2026-03-21 18:26:25'),(2,'Action','2026-03-21 18:26:25','2026-03-21 18:26:25'),(3,'Indie','2026-03-21 18:26:25','2026-03-21 18:26:25');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alex','alex@mail.com','2026-03-21 18:26:25','2026-03-21 18:26:25'),(2,'sara','sara@mail.com','2026-03-21 18:26:25','2026-03-21 18:26:25');
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

-- Dump completed on 2026-03-22 19:05:52
