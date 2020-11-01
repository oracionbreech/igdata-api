import User from "../models/user";
import Comments from "../models/comments";

export default async function getComments(req, res, next) {
  const { commentor } = req.query;

  res.status(200).json({
    commentor,
  });
}
