import mongoose, { Schema } from "mongoose";

const Comments = new Schema({
  commentor: String,
  date: { type: Date, unique: true },
  comment: String,
  instagram: String,
});

export default mongoose.model("Comments", Comments);
