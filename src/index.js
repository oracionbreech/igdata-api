import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import clearFields from "./routes/clear-fields";
import getComments from "./routes/get-comments";
import UploadFile from "./routes/upload-file";

const PORT = 5000;
const router = express.Router();
const app = express();
const mongoDB = "mongodb://127.0.0.1/igdata";
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(router);

router.use(function timeLog(req, res, next) {
  console.log(`${req.method} Time: `, Date.now());
  next();
});

// ROUTES
router.get("/clear-fields", clearFields);
router.get("/get-comments", getComments);
router.post("/upload-file", UploadFile);

const server = http.createServer(app);
server.listen(PORT, async () => {
  await mongoose
    .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Connected to DB"))
    .catch((err) => console.error(err));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));

  console.log(`Listening at PORT: ${PORT}`);
});
