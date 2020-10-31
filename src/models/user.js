import mongoose, { Schema } from "mongoose";

const User = new Schema({
  user: String,
});

export default mongoose.model("User", User);
