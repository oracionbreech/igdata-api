import mongoose, { Schema } from "mongoose";

const Comments = new Schema({
  commentor: String,
  date: { type: Date },
  comment: String,
  instagram: String,
});

export default mongoose.model("Comments", Comments);
