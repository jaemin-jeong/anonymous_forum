import { Router } from "express";
import community from '../controllers/community.js';

const router = Router();

// 게시글 목록 조회 API
router.get('/post', community.getPosts);

// 게시글 작성 API
router.post('/post', community.createPost);

// 게시글 수정 API
router.patch('/post/:idx', community.editPost);

// 게시글 삭제 API
router.delete('/post/:idx', community.deletePost)

// 댓글 목록 API
router.get('/comment/:idx', community.getComments);

// 댓글 작성 API
router.post('/comment/:idx', community.createComment);

export default router;