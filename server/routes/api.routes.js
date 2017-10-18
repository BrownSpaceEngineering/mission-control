import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
import * as TwitterController from '../controllers/twitter.controller';


const router = new Router();

// CommentController
router.route('/addcomment').post(CommentController.createComment);
router.route('/getcomment').post(CommentController.getCommentFromUser);

// TwitterController
router.route('/gettweets').get(TwitterController.getTweets);

// ----------------------------------------

export default router;
