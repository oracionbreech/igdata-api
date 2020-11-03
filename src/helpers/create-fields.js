const _ = require("lodash");
import Comments from "../models/comments";

export default async function createComments(comments, commentor) {
  const createComments = await Promise.all(
    await comments.map(async (comment) => {
      const theObject = {
        commentor: commentor,
        date: comment[0],
        comment: comment[1],
        instagram: comment[2],
      };

      const findingNemo = await Comments.find({
        commentor: commentor,
        date: comment[0],
        comment: comment[1],
        instagram: comment[2],
      });

      if (findingNemo.length === 0) {
        return theObject;
      } else {
        return null;
      }
    })
  );

  const filterCreateComments = createComments.filter((fCt) => fCt !== null);

  const comment =
    filterCreateComments.length > 0
      ? await Comments.insertMany(filterCreateComments)
      : null;

  return comment;
}
