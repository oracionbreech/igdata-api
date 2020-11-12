import multer from "multer";
import Uploads from "../models/uploads";
import fs from "fs";
import path from "path";
import createComments from "../helpers/create-fields";
import _ from "lodash";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

export default async function UploadFile(req, res, next) {
  try {
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
        commentor,
      });

      const { media_comments } = await JSON.parse(
        fs.readFileSync(path.join(__dirname + "/../../tmp/" + filename))
      );

      const createfields = await createComments(media_comments, commentor);

      if (createfields === null) {
        res.status(400).json({
          error: true,
          message:
            "Uniqueness of Comments is not present. You must have uploaded it already",
        });
      } else {
        res.status(200).json({
          creator: createUploadField,
          uploaded: createfields,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
