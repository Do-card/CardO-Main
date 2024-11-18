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
-- Table structure for table `fcm`
--

DROP TABLE IF EXISTS `fcm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fcm` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK74jnp2iheswrhrr8w5pwvemhq` (`user_id`),
  CONSTRAINT `FK74jnp2iheswrhrr8w5pwvemhq` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fcm`
--

LOCK TABLES `fcm` WRITE;
/*!40000 ALTER TABLE `fcm` DISABLE KEYS */;
INSERT INTO `fcm` VALUES (1,_binary '','c2wvPQ_mRr-pofXBuMtud5:APA91bHNQoqJ0lF1XNth9ZbBBvhcm_ay8twWVr-QWh3NTTfDnnhhy3HbeFmBwNL1g9dhkcmd-hpdS_1FXI8accYMV5_lP9wHl4sDeAP-m1eBPpKrnHpZOok',1),(2,_binary '','cLpbCw77RfKp2KYMIga7t6:APA91bG8evVe3z60-vKmn-a5q67Z2iA2u7r6YlKvtWJ0QrsGuZrJPaeZdBfph2h1Y4QEmZpgO0jVwVGglh8AkZWIoX1m_yevMeYo8VLYLqrXS2Su0dzmihs',1),(3,_binary '\0','cRQ5FUEVTnSFJg1ddojoxs:APA91bGFjuiKEgGfVoNrv12b8eg-5hdyH4PP8r3mRaCapOGL7t9TaYNIuLW-M_V4fYw_24dYPHX3OJyBcg7yf-sGci8ljgudzSRVHLRHAkS05uvbqgO2RG8',1),(4,_binary '\0','cC4AkidPRe6CbnarbLrRIf:APA91bHwbCgQh_pM32S22PzwzKzcjdYyFVLtrrIb0dUXWLEjZ37x_09TUipPjn_lIwAZzU5IU4Gvwmd43AS1eOoraQEzImXATOKdZiqjxh8RbPrOjuYyci8',1),(5,_binary '\0','flFpkqAKTc6yuVWRvkYmmv:APA91bF4T7eweIsXFWX8-QFWouDYyIp6fPuZ_bguehVIlT7A1-76_MLcPcfrR8bddA1Wydt8GbiZVOgJa0xFNTzDcoEB8L78HUrhDUEbd8XKc29paWoJzCQ',1),(6,_binary '\0','fu5W4No6SZCfvSioD3JTSy:APA91bFLhhWe60nGsYoG3xUMYjnb4ZuTAiNOieSgwxw2Qslt8ASe-tJuQU-UB5A781pUjtuqCbb9z-B1ag-peMVlYGOYh9r-TERAhu2VqKv4tQBNVJjV4MM',8),(7,_binary '\0','e1KTnGwARjmN4NH7j7Jlhj:APA91bGGZ8kjECmebvfETbH7Osmjs67NYuHQ1rlkLnfqeP4nxNIXSWrd7wZEY3p0KugPcy5XnlXOLXdxukl-4OGWgjHtWdjLA-O5V27KCNYXtvVAu9FZAW8',1);
/*!40000 ALTER TABLE `fcm` ENABLE KEYS */;
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
