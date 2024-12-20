-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: k11a402.p.ssafy.io    Database: cardo
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `account_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `user_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES (1,'2024-11-08 14:06:10.086906','2024-11-08 14:06:10.086906','0011280809365634','test402@gmail.com',_binary '\0','1cd79eba-e856-45db-accb-2241406acd0b'),(6,'2024-11-11 10:41:59.263098','2024-11-11 10:41:59.263098','0010455297180312','test9999@gmail.com',_binary '\0','a7062b20-2fcf-4a8d-b014-53e207d6c819'),(7,'2024-11-11 10:42:31.445233','2024-11-11 10:42:31.445233','0018396593374663','test9988@gmail.com',_binary '\0','e613532f-4343-44ea-88f2-83a615364245'),(8,'2024-11-11 10:47:13.004304','2024-11-11 10:47:13.004304','0018241848748909','test9998@gmail.com',_binary '\0','873eac94-9f5e-4633-b270-42fae28d6b26'),(9,'2024-11-11 10:53:43.630981','2024-11-11 10:53:43.630981','0015849732076593','test9997@test.com',_binary '\0','43811194-da0f-4374-8cc7-5528f8ebba4e'),(10,'2024-11-11 16:19:14.315579','2024-11-11 16:19:14.315579','0010901781550562','test9900@gmail.com',_binary '\0','fcd47658-c02e-410e-87c8-ad1d1108bbd7'),(11,'2024-11-12 10:39:08.143401','2024-11-12 10:39:08.143401','0015368578655288','hslee0912@gmail.com',_binary '\0','8033f3cc-adff-42eb-a6f9-25e12a556c29'),(12,'2024-11-13 12:56:28.044459','2024-11-13 12:56:28.044459','0012582134093942','kdh402@gmail.com',_binary '\0','6e23cf63-b1d5-4883-bf84-e178d811e5ad'),(13,'2024-11-13 14:08:00.876070','2024-11-13 14:08:00.876070','0014055306632457','ldy402@gmail.com',_binary '\0','cfec7fa1-098f-4f33-9bd6-92dbeee6143b'),(14,'2024-11-13 14:24:28.738426','2024-11-13 14:24:28.738426','0011243470419151','test40age@gmail.com',_binary '\0','583d706a-a6fd-47b1-beff-4ab978b94d92'),(15,'2024-11-18 10:16:54.695109','2024-11-18 10:16:54.695109','0016104317691638','ssafycoachdb@gmail.com',_binary '\0','4e309b58-4b60-4836-99cd-29779b189a02');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18 13:25:25
