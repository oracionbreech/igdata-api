import multer from "multer";
import Uploads from "../models/uploads";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

export default function UploadFile(req, res, next) {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const { commentor } = req.body;
    const { filename, originalname, destination } = req.file;

    // UPDATE DB
    const createUploadField = await Uploads.create({
      filename,
      originalname,
      destination,
      user: commentor,
    });

    const commentorUpload = await JSON.parse(
      fs.readFileSync(path.join(__dirname + "/../../public/" + filename))
    );
    res.status(200).json({
      creator: createUploadField,
      uploaded: commentorUpload,
    });
  });
}
