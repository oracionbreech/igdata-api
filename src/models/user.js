import mongoose, { Schema } from "mongoose";

const User = new Schema({
  createdAt: { type: Date, default: Date.now() },
  isEmployed: { type: Boolean, default: true },
  name: { type: String, required: true },
});

export default mongoose.model("User", User);
