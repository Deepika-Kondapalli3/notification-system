import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark notification as read
router.post("/:notifId/read", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.notifId, { isRead: true });
  res.json({ success: true });
});

export default router;
