import Comments from "../models/comments";
import Uploads from "../models/uploads";

export default async function clearFields(req, res, next) {
  await Comments.deleteMany({});
  await Uploads.deleteMany({});
  res.status(200).json({
    message: "deleted fields",
  });
}
