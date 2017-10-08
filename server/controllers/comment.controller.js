import * as Comment from '../models/comment';

export function createComment(req, res) {
  if (!req.body || !req.body.userid || !req.body.comment) {
    res.status(400).send({ error: 'not enough info' });
    return;
  }

  const userid = req.body.userid;
  const comment = req.body.comment;
  Comment.createComment(userid, comment, (result) => {
    if (result) {
      res.status(200).send({ status: 'success' });
    } else {
      res.status(500).send({ error: 'database error' });
    }
  });
}

export function getCommentFromUser(req, res) {
  if (!req.body || !req.body.userid) {
    res.status(400).send({ error: 'not enough info' });
    return;
  }

  const userid = req.body.userid;
  Comment.getCommentFromUser(userid, (result) => {
    if (result) {
      res.status(200).send({
        status: 'success',
        userid: result.userid,
        comment: result.comment,
      });
    } else {
      res.status(500).send({ error: 'database error' });
    }
  });
}

