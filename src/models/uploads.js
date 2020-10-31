import mongoose, { Schema } from "mongoose";

const Uploads = new Schema({
  createdAt: { type: String, default: Date.now() },
  originfilename: String,
  filename: String,
  commentor: String,
  destination: String,
});

export default mongoose.model("Uploads", Uploads);
