import User from "../models/user";
import Comments from "../models/comments";
import Uploads from "../models/uploads";

export default async function deleteUser(req, res, next) {
  const { user } = req.body;
  const deleteUser = await User.deleteOne({ _id: user });
  const deleteComments = await Comments.deleteMany({ commentor: user });
  const deleteUploads = await Uploads.deleteMany({ commentor: user });
  res.status(200).json({ deleteUser, deleteComments, deleteUploads });
}
