import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';


const router = new Router();

// CommentController
router.route('/addcomment').post(CommentController.createComment);
router.route('/getcomment').post(CommentController.getCommentFromUser);

// ----------------------------------------

export default router;
