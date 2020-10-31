import mongoose, { Schema } from "mongoose";

const Comments = new Schema({
  date: Date,
  comment: String,
  user: String,
});

export default mongoose.model("Comments", Comments);
