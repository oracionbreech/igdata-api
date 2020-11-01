import mongoose, { Schema } from "mongoose";

const User = new Schema({
  createdAt: { type: Date, default: Date.now() },
  user: String,
});

export default mongoose.model("User", User);
