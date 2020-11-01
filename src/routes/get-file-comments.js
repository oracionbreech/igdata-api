import Uploads from "../models/uploads";
import path from "path";
import fs from "fs";

export default async function getFileComments(req, res, next) {
  const { fileId } = req.query;
  const file = await Uploads.findOne({ _id: fileId }).catch((err) =>
    res.status(400).json(err)
  );

  res.status(200).json({
    media_comments,
  });
}
