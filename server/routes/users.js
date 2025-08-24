import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Create user
router.post("/", async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.json(user);
});


router.post("/:userId/follow/:targetId", async (req, res) => {
  const { userId, targetId } = req.params;

  try {
    const user = await User.findById(userId);
    const target = await User.findById(targetId);

    if (!user || !target) return res.status(404).json({ message: "User not found" });

    // Add userId to target's followers if not already
    if (!target.followers.includes(userId)) {
      target.followers.push(userId);
      await target.save();
    }

    res.json({ success: true, message: `${user.name} is now following ${target.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
