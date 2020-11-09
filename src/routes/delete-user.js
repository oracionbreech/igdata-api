import User from "../models/user";
import Comments from "../models/comments";
import Uploads from "../models/uploads";

export default async function deleteUser(req, res, next) {
  const { userId } = req.params;
  const deleteUser = await User.deleteOne({ _id: userId });
  const deleteComments = await Comments.deleteMany({ commentor: userId });
  const deleteUploads = await Uploads.deleteMany({ commentor: userId });
  res.status(200).json({ deleteUser, deleteComments, deleteUploads });
}
