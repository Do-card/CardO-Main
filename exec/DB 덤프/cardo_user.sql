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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `account_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2024-11-08 14:06:10.207907','2024-11-08 14:06:10.207907','0011280809365634','2000-11-08','test402@gmail.com',_binary '\0','김싸피','테스트유저1','$2a$10$wE.0ubaEHUJ6G0g5UiVKKe9Nvho19U76kjbSVxeR3GqsgbqMQDtWq','USER','1cd79eba-e856-45db-accb-2241406acd0b'),(2,'2024-10-31 00:28:27.717531','2024-10-31 00:28:27.717531','0015903544386366','1997-12-09','a402test2@gmail.com',_binary '\0','테스트유저','테스형','$2a$10$u3V4O8my79uJJ2tcXmMBt.Zk1a/rKR/nkEgTdYXg9GrSD.Ht8w8TW','USER','3149b095-0151-4d52-bfba-baf7a8226949'),(3,'2024-11-11 10:41:59.361196','2024-11-11 10:41:59.361196','0010455297180312','1999-05-01','test9999@gmail.com',_binary '\0','테스트','테스트','$2a$10$W1zi9dq2ES7KguWVzZBHjO7bnaTiLkUTOOIWRlQmGC0W4u0/lbs0e','USER','a7062b20-2fcf-4a8d-b014-53e207d6c819'),(4,'2024-11-11 10:42:31.543243','2024-11-11 10:42:31.543243','0018396593374663','2012-05-03','test9988@gmail.com',_binary '\0','테스트','테스트','$2a$10$IqsSHS3gGh8TO2mwCU3hmu2InXJlqxPmonk5BmCoXOK5Q13yHezFm','USER','e613532f-4343-44ea-88f2-83a615364245'),(5,'2024-11-11 10:47:13.103544','2024-11-11 10:47:13.103544','0018241848748909','1999-05-01','test9998@gmail.com',_binary '\0','테스트','테스트','$2a$10$ndWgc6mUX4/m1IAF/2NwUO/WLJPFI2/SxFNJNcIuUsHm8G8n7jpSy','USER','873eac94-9f5e-4633-b270-42fae28d6b26'),(6,'2024-11-11 10:53:43.729574','2024-11-11 10:53:43.729574','0015849732076593','1999-05-01','test9997@test.com',_binary '\0','test','test','$2a$10$MiUkuHmfEoydn.eVWa3P8O/9QofGo6IVphdQpXaCtcSqw9FVz536G','USER','43811194-da0f-4374-8cc7-5528f8ebba4e'),(7,'2024-11-11 16:19:14.433856','2024-11-11 16:19:14.433856','0010901781550562','2024-10-28','test9900@gmail.com',_binary '\0','김싸피','싸피최고','$2a$10$BJjqgBSbhtkSyb7UcqUJdewc7M/7Js5axIKXRNQKLdk5ItZZcWQVO','USER','fcd47658-c02e-410e-87c8-ad1d1108bbd7'),(8,'2024-11-12 10:39:08.247415','2024-11-12 10:39:08.247415','0015368578655288','1981-09-12','hslee0912@gmail.com',_binary '\0','이현석','riri0912','$2a$10$/u9XZJnci195EpeCQV02r.Ln9AYisO7r0Q3mujDJCjVprEs7Rg0Tu','USER','8033f3cc-adff-42eb-a6f9-25e12a556c29'),(9,'2024-11-13 12:56:28.142346','2024-11-13 12:56:28.142346','0012582134093942','2001-09-06','kdh402@gmail.com',_binary '\0','고다현','갓다현','$2a$10$Eg7QSyujHI.Ii37PE5sZLOGrr9FAJx6RHS42wnOIYQaZyFmvN77ki','USER','6e23cf63-b1d5-4883-bf84-e178d811e5ad'),(10,'2024-11-13 14:08:00.973686','2024-11-13 14:08:00.973686','0014055306632457','1991-11-30','ldy402@gmail.com',_binary '\0','ldy','ldy','$2a$10$pcx7BX/DU/vYK8.hl1Kdd.05g1EJUTK0nQoJLxEJBNIKrRFRdrx0W','USER','cfec7fa1-098f-4f33-9bd6-92dbeee6143b'),(11,'2024-11-13 14:24:28.835396','2024-11-13 14:24:28.835396','0011243470419151','1981-05-29','test40age@gmail.com',_binary '\0','test40','test40','$2a$10$iPVYS6WUlQ6uDkFTyZC3kePQL18BuIZKY4d.xA32FRyk4nZ/uAZEK','USER','583d706a-a6fd-47b1-beff-4ab978b94d92'),(12,'2024-11-18 10:16:54.794665','2024-11-18 10:16:54.794665','0016104317691638','2000-01-01','ssafycoachdb@gmail.com',_binary '\0','ssafycoach','ssafycoach','$2a$10$qOMqBmyIAlKQkg7trh.3J.0tqB7si55HmNOGiIcBny1pNlK1dBcpW','USER','4e309b58-4b60-4836-99cd-29779b189a02');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18 13:25:26
