import mongoose, { Schema } from "mongoose";

const Auditors = new Schema({
  createdAt: { type: Date, default: Date.now() },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Auditors", Auditors);
