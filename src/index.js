import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import clearFields from "./routes/clear-fields";
import getComments from "./routes/get-comments";
import UploadFile from "./routes/upload-file";
import createUser from "./routes/create-user";
import getUsers from "./routes/get-users";
import getFiles from "./routes/get-files";
import getFileComments from "./routes/get-file-comments";
import deleteUser from "./routes/delete-user";
import createAuditors from "./routes/create-auditor";
import loginAuditor from "./routes/login-auditor";
import "dotenv/config";
import getUser from "./routes/get-user";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(morgan("combined"));
const router = express.Router();
app.use(
  cors({
    origin: ["http://18.136.123.125:5000", "http://localhost:3000"],
  })
);
app.use(express.static(__dirname + "/tmp"));
app.use(router);
router.use(express.json());
const mongoDB = process.env.MONGODB_URI;

router.use(function timeLog(req, res, next) {
  console.log(`${req.method} Time: `, Date.now());
  next();
});

// ROUTES
router.get("/clear-fields", clearFields);
router.get("/get-comments", getComments);
router.get("/get-users", getUsers);
router.get("/get-files", getFiles);
router.get("/get-file-comments", getFileComments);
router.get("/get-user/:userId", getUser);

router.post("/upload-file", UploadFile);
router.post("/create-user", createUser);
router.post("/create-auditor", createAuditors);
router.post("/login-auditor", loginAuditor);

router.delete("/delete-user/:userId", deleteUser);

const server = http.createServer(app);
server.listen(PORT, async () => {
  await mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(console.log("Connected to DB"))
    .catch((err) => console.error(err));
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));

  console.log(`Listening at PORT: ${PORT}`);
});
