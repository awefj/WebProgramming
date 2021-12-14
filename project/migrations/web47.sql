-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: web47
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `authcodes`
--

DROP TABLE IF EXISTS `authcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authcodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userID` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `authcodes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`web47ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authcodes`
--

LOCK TABLES `authcodes` WRITE;
/*!40000 ALTER TABLE `authcodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `authcodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `followingID` int NOT NULL,
  `followerID` int NOT NULL,
  PRIMARY KEY (`followingID`,`followerID`),
  KEY `followerID` (`followerID`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`followingID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followerID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('2021-12-14 09:52:01','2021-12-14 09:52:01',1,2);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtags`
--

DROP TABLE IF EXISTS `hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
INSERT INTO `hashtags` VALUES (1,'test','2021-12-12 16:49:32','2021-12-12 16:49:32'),(2,'testing','2021-12-13 16:17:59','2021-12-13 16:17:59');
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posthashtag`
--

DROP TABLE IF EXISTS `posthashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posthashtag` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int NOT NULL,
  `HashtagId` int NOT NULL,
  PRIMARY KEY (`PostId`,`HashtagId`),
  KEY `HashtagId` (`HashtagId`),
  CONSTRAINT `posthashtag_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posthashtag_ibfk_2` FOREIGN KEY (`HashtagId`) REFERENCES `hashtags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posthashtag`
--

LOCK TABLES `posthashtag` WRITE;
/*!40000 ALTER TABLE `posthashtag` DISABLE KEYS */;
INSERT INTO `posthashtag` VALUES ('2021-12-12 16:49:32','2021-12-12 16:49:32',1,1),('2021-12-13 08:26:27','2021-12-13 08:26:27',2,1),('2021-12-13 08:27:08','2021-12-13 08:27:08',3,1),('2021-12-13 16:17:59','2021-12-13 16:17:59',11,2);
/*!40000 ALTER TABLE `posthashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'no image test\r\n#test',NULL,'2021-12-12 16:49:32','2021-12-12 16:49:32',1),(2,'single image test\r\n#test','/img/1639383976996.png','2021-12-13 08:26:27','2021-12-13 08:26:27',1),(3,'multiple image test\r\n#test','/img/1639384027556.gif;/img/1639384027565.gif;/img/1639384027574.gif','2021-12-13 08:27:08','2021-12-13 08:27:08',1),(4,'single image test','/img/1639384212813.gif','2021-12-13 08:30:15','2021-12-13 08:30:15',1),(5,'no image test',NULL,'2021-12-13 08:32:50','2021-12-13 08:32:50',1),(6,'no image test',NULL,'2021-12-13 08:33:05','2021-12-13 08:33:05',1),(7,'single image test','/img/1639384402979.gif','2021-12-13 08:33:24','2021-12-13 08:33:24',1),(8,'single image test','/img/1639384437629.gif','2021-12-13 08:34:02','2021-12-13 08:34:02',1),(9,'multi image test\r\nwith multiple upload attempts','/img/1639384471726.jpg;/img/1639384475234.gif;/img/1639384490179.gif','2021-12-13 08:34:51','2021-12-13 08:34:51',1),(10,'no image & page limit test',NULL,'2021-12-13 08:35:33','2021-12-13 08:35:33',1),(11,'testing hashtag\r\n#testing',NULL,'2021-12-13 16:17:59','2021-12-13 16:17:59',1),(12,'testing another account','/img/1639413204242.gif','2021-12-13 16:33:25','2021-12-13 16:33:25',2),(13,'',NULL,'2021-12-14 02:35:37','2021-12-14 02:35:37',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `name` varchar(15) NOT NULL,
  `web47ID` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `emailConfirm` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `web47ID` (`web47ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'a@a','a','1','$2b$12$EMElfFSMVKzBEwXZTNIiFOP/z3v9/l5i8Xeh6epBwohx8RgWVGQbW',1,'2021-12-12 16:49:01','2021-12-12 16:49:01',NULL),(2,'b@b','b','2','$2b$12$C3tExLbfOMg9rgpfmSd2M.gJHWsr6qGizsQWuVJ2Pj6Nuz8J.b2Ou',1,'2021-12-12 16:49:07','2021-12-12 16:49:07',NULL);
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

-- Dump completed on 2021-12-14 20:59:13
