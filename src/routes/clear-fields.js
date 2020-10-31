import User from "../models/user";
import Comments from "../models/comments";

export default async function clearFields(req, res, next) {
  await User.deleteMany({});
  await Comments.deleteMany({});
  res.status(200).json({
    message: "deleted fields",
  });
}
