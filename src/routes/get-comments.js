import User from "../models/user";
import Comments from "../models/comments";

export default async function getComments(req, res, next) {
  res.status(200).json({
    message: "deleted fields",
  });
}
