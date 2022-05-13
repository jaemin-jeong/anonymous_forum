CREATE TABLE `tb_post` (
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL COMMENT '제목',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '내용',
  `writer` varchar(10) NOT NULL COMMENT '작성자 이름',
  `pw` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '비밀번호',
  `salt` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 시간',
  `up_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정시간',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글 테이블'