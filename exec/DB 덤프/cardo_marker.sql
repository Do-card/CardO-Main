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
-- Table structure for table `marker`
--

DROP TABLE IF EXISTS `marker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marker` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `color_background` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_complete` bit(1) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `is_favorite` bit(1) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poi_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poi_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3s7rcqg20bmsepvwiw9hsvc8p` (`user_id`),
  CONSTRAINT `FK3s7rcqg20bmsepvwiw9hsvc8p` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marker`
--

LOCK TABLES `marker` WRITE;
/*!40000 ALTER TABLE `marker` DISABLE KEYS */;
INSERT INTO `marker` VALUES (88,'2024-11-13 13:05:58.380487','2024-11-13 13:07:57.048197','#FFEEE7',_binary '\0',_binary '\0',_binary '\0',37.5018952591279,127.039347134781,'선물 사기','20494146','스타벅스 역삼대로점',9),(89,'2024-11-13 13:06:10.856397','2024-11-13 13:39:46.290150','#FFEEE7',_binary '\0',_binary '\0',_binary '',37.5023134844679,127.038867839492,'장보기','26820270','GS25 역삼본점',9),(90,'2024-11-13 13:06:59.483227','2024-11-13 13:09:48.163355','#F9FFDE',_binary '\0',_binary '\0',_binary '\0',37.50240566234112,127.0380219498173,'케익 주문','20089944','투썸플레이스 역삼역점',1),(91,'2024-11-13 13:08:03.318334','2024-11-13 13:29:39.563624','#FFEEE7',_binary '\0',_binary '\0',_binary '\0',37.5002747065111,127.04346954683,'심부름','478131653','투썸플레이스 역삼자이점',1),(92,'2024-11-13 13:13:15.087276','2024-11-13 13:14:19.119947','#FFFFFF',_binary '\0',_binary '',_binary '\0',37.51174052867,127.030208706115,'','24207649','이마트24 논현개나리점',1),(93,'2024-11-13 13:14:21.640491','2024-11-13 13:14:58.079182','#FFEEE7',_binary '\0',_binary '\0',_binary '\0',37.4992491869793,127.035947437409,'생활용품 사기','97548915','이마트24 self위워크역삼2점',1),(94,'2024-11-13 13:17:51.099477','2024-11-13 13:18:47.112459','#E8DBFF',_binary '\0',_binary '\0',_binary '\0',37.5023134298285,127.025925464437,'운동화 구매','24755733','나이키 강남점',1),(95,'2024-11-13 13:25:33.845714','2024-11-18 10:56:58.737192','#FFFFFF',_binary '\0',_binary '\0',_binary '\0',37.4989465499135,127.029027435905,'다이소','12638299','다이소 강남역2호점',1),(96,'2024-11-13 13:27:40.659997','2024-11-18 10:56:51.451876','#FFF9D2',_binary '\0',_binary '\0',_binary '',37.5000076518743,127.036541521547,'올리브영','9256068','올리브영 강남파이낸스점',1),(97,'2024-11-13 13:27:43.148746','2024-11-13 13:37:50.484607','#FFEEE7',_binary '\0',_binary '\0',_binary '\0',37.5002747065111,127.04346954683,'','478131653','투썸플레이스 역삼자이점',9),(98,'2024-11-13 13:31:31.857237','2024-11-13 13:37:17.692868','#FFFFFF',_binary '\0',_binary '\0',_binary '\0',37.5084059359941,127.021929405076,'김밥','289678302','꼬마김밥천국 본점',1),(99,'2024-11-13 13:33:54.507918','2024-11-13 13:37:11.879233','#FFF9D2',_binary '\0',_binary '\0',_binary '\0',37.5125438582705,127.0280396080632,'심부름','16879083','CU 논현우람점',1),(100,'2024-11-13 13:38:01.089781','2024-11-13 13:38:53.644700','#F9FFDE',_binary '\0',_binary '\0',_binary '\0',37.51174052867,127.030208706115,'','24207649','이마트24 논현개나리점',1),(101,'2024-11-13 13:40:15.338977','2024-11-13 13:43:05.809549','#E8DBFF',_binary '\0',_binary '\0',_binary '\0',37.5105419126541,127.023516900431,'야채 및 과일','1593837538','농협축산물판매장',1),(102,'2024-11-13 13:40:17.813860','2024-11-13 13:40:38.963527','#F9FFDE',_binary '\0',_binary '',_binary '\0',37.5002747065111,127.04346954683,'','478131653','투썸플레이스 역삼자이점',9),(103,'2024-11-13 13:40:51.854300','2024-11-13 13:41:19.987784','#E8DBFF',_binary '\0',_binary '',_binary '\0',37.5002747065111,127.04346954683,'','478131653','투썸플레이스 역삼자이점',9),(104,'2024-11-13 13:41:24.172261','2024-11-13 13:41:24.172261','#FFEEE7',_binary '\0',_binary '\0',_binary '\0',NULL,NULL,'',NULL,NULL,9),(105,'2024-11-13 13:44:53.260787','2024-11-13 13:44:53.260787','#FFFFFF',_binary '\0',_binary '',_binary '\0',NULL,NULL,'',NULL,NULL,1),(106,'2024-11-13 14:08:15.217091','2024-11-13 14:08:59.433259','#E8DBFF',_binary '\0',_binary '\0',_binary '\0',37.50240566234112,127.0380219498173,'','20089944','투썸플레이스 역삼역점',2),(107,'2024-11-13 14:09:22.349378','2024-11-13 14:09:36.140149','#E8DBFF',_binary '\0',_binary '\0',_binary '\0',37.5135533395888,127.030245631984,'','16272886','홈플러스익스프레스 학동역점',10),(108,'2024-11-13 14:10:43.811608','2024-11-13 14:12:50.953919','#EAF6FD',_binary '\0',_binary '\0',_binary '\0',37.50074251744772,127.04039940461738,'','2094295768','텐퍼센트커피 역삼센트럴점',10),(109,'2024-11-13 14:11:42.259845','2024-11-13 14:12:02.906365','#FFF9D2',_binary '\0',_binary '\0',_binary '\0',37.5125438582705,127.0280396080632,'','16879083','CU 논현우람점',2),(110,'2024-11-13 14:13:55.869575','2024-11-13 14:14:08.232827','#FFFFFF',_binary '\0',_binary '\0',_binary '\0',37.49864658673187,127.02873329209403,'','22318989','맥도날드 강남2호점',2),(111,'2024-11-13 14:15:27.617547','2024-11-13 14:16:06.273451','#FFF9D2',_binary '\0',_binary '\0',_binary '\0',37.5018746597447,127.03613982230588,'','12068019','파리바게뜨 역삼역점',10),(112,'2024-11-13 14:25:24.375539','2024-11-13 14:28:34.296756','#F9FFDE',_binary '\0',_binary '\0',_binary '\0',37.49930420889,127.048397383795,'이마트','8046653','이마트 역삼점',11),(113,'2024-11-13 14:26:38.011322','2024-11-13 14:27:05.912885','#EAF6FD',_binary '\0',_binary '\0',_binary '\0',37.49970018153835,127.03429429003373,'','20104849','올리브영 역삼역점',4),(114,'2024-11-13 14:31:06.467194','2024-11-13 14:31:06.467194','#EAF6FD',_binary '\0',_binary '',_binary '\0',NULL,NULL,'',NULL,NULL,11),(115,'2024-11-13 14:31:39.309012','2024-11-13 14:32:09.446262','#FFF9D2',_binary '\0',_binary '\0',_binary '\0',37.507238568097,127.032256273604,'','26858784','일일향 2호점',4),(116,'2024-11-13 15:26:09.205776','2024-11-13 15:26:09.205776','#F9FFDE',_binary '\0',_binary '',_binary '\0',NULL,NULL,'',NULL,NULL,1),(117,'2024-11-14 14:09:41.416230','2024-11-18 10:54:07.299516','#F9FFDE',_binary '\0',_binary '\0',_binary '\0',NULL,NULL,'문방구',NULL,NULL,1),(118,'2024-11-14 15:38:20.401094','2024-11-18 11:54:37.548618','#FFFFFF',_binary '\0',_binary '\0',_binary '',37.50120246050106,127.03912171929083,'','1372855768','바나프레소 테헤란로점',8),(119,'2024-11-14 15:40:41.453861','2024-11-18 11:54:58.769309','#FFEEE7',_binary '',_binary '',_binary '',NULL,NULL,'',NULL,NULL,8),(120,'2024-11-18 10:53:48.295060','2024-11-18 10:53:48.295060','#FFF9D2',_binary '\0',_binary '\0',_binary '\0',NULL,NULL,'',NULL,NULL,1),(121,'2024-11-18 11:55:03.756630','2024-11-18 11:55:40.730404','#FFEEE7',_binary '\0',_binary '\0',_binary '',37.5009689784835,127.039486881649,'','27603078','GS25 지에스사랑점',8);
/*!40000 ALTER TABLE `marker` ENABLE KEYS */;
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
