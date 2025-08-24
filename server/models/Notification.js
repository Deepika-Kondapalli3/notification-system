import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Bob
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    // Alice
  type: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
