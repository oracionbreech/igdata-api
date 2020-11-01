const _ = require("lodash");
import Comments from "../models/comments";

export default async function createComments(comments, commentor) {
  const createComments = comments.map((comment) => ({
    commentor: commentor,
    date: comment[0],
    comment: comment[1],
    instagram: comment[2],
  }));

  const comment = await Comments.updateMany(
    {},
    createComments,
    { upsert: true },
    (err, doc) => {
      console.log(doc);
    }
  );

  return comment;
}
