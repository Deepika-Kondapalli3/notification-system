// server/fixNotifications.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Notification from "./models/Notification.js";

dotenv.config(); // to load MONGODB_URI from .env

async function fixNotifications() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");

    // Update notifications missing title or message
    const result = await Notification.updateMany(
      { $or: [{ title: { $exists: false } }, { message: { $exists: false } }] },
      { $set: { title: "No Title", message: "No Message" } }
    );

    console.log(`Updated ${result.modifiedCount} notifications`);

    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error fixing notifications:", err);
  }
}

fixNotifications();
