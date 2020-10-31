import multer from "multer";
import Uploads from "../models/uploads";
import fs from "fs";
import util from "util";
import path from "path";

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, "utf8");

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

    console.log(createUploadField);
    const commentorUpload = await JSON.parse();

    console.log(
      await readFile(path.join(__dirname, "../../public/" + filename))
    );

    res.status(200).json(createUploadField);
  });
}
