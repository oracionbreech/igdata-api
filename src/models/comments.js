import mongoose, { Schema } from "mongoose";

const Comments = new Schema({
  commentor: String,
  date: Date,
  comment: String,
  instagram: String,
});

export default mongoose.model("Comments", Comments);
