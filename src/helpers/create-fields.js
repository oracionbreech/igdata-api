const _ = require("lodash");
import Comments from "../models/comments";

export default async function createComments(comments, commentor) {
  console.log(commentor);
  const createComments = comments.map((comment) => {
    return {
      commentor: commentor,
      date: comment[0],
      comment: comment[1],
      instagram: comment[2],
    };
  });

  const comment = await Comments.insertMany(createComments).catch((err) => err);

  return comment;
}
