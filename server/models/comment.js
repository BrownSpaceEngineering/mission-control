import { Comment } from '../initialize.js';


export function createComment(userid, comment, next) {
  const note = new Comment();
  note.userid = userid;
  note.comment = comment;

  note.save((err, data) => {
    if (err) {
      console.error(err);
      next();
    } else {
      next(data);
    }
  });
}

export function getCommentFromUser(userid, next) {
  Comment.find({
    userid,
  }).select('userid comment').exec((err, result) => {
    if (err) {
      console.error(err);
      next();
    } else {
      next(result[0]);
    }
  });
}
