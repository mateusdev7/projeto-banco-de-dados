CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(145) NOT NULL,
  `email` varchar(145) NOT NULL,
  `descriptionAccess` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `zipCode` int DEFAULT NULL,
  `number` int DEFAULT NULL,
  `complement` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
SELECT * FROM beautysalon.users;