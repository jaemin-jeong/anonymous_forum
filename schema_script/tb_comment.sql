CREATE TABLE `tb_comment` (
  `idx` bigint NOT NULL AUTO_INCREMENT,
  `post_idx` bigint NOT NULL COMMENT '게시글 고유키',
  `parent_idx` bigint NOT NULL DEFAULT '0' COMMENT '상위 댓글 고유키',
  `comment` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '댓글 내용',
  `writer` varchar(10) NOT NULL COMMENT '작성자',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 시간',
  PRIMARY KEY (`idx`),
  KEY `tb_comment_post_idx_IDX` (`post_idx`,`parent_idx`) USING BTREE,
  CONSTRAINT `tb_comment_FK` FOREIGN KEY (`post_idx`) REFERENCES `tb_post` (`idx`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글 테이블'