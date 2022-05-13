CREATE TABLE `tb_keyword` (
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `receiver` varchar(10) NOT NULL COMMENT '수신자명',
  `keyword` varchar(10) NOT NULL COMMENT '키워드',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='키워드 테이블'