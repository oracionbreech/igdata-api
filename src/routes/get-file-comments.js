import Uploads from "../models/uploads";

export default async function getFileComments(req, res, next) {
  const { fileId } = req.query;
  const file = await Uploads.findOne({ _id: fileId });

  res.status(200).json({
    file,
  });
}
