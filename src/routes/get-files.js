import Uploads from "../models/uploads";

export default async function getFiles(req, res, next) {
  const { commentor } = req.query;
  const uploads = await Uploads.find({ commentor: commentor }).catch((err) =>
    res.status(400).json(err)
  );

  res.status(200).json({
    uploads,
  });
}
