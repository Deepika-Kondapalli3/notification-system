import express from "express";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const router = express.Router();

export default (io) => {
  router.post("/", async (req, res) => {
    const { authorId, content } = req.body;

    // 1. Create post
    const post = await Post.create({ author: authorId, content });

    // 2. Get author's followers
    const author = await User.findById(authorId);

    for (let followerId of author.followers) {
      // 3. Create notification for each follower
      const notif = await Notification.create({
        recipient: followerId,   // Bob
        sender: authorId,        // Alice
        type: "post",
        post: post._id,
        title: `${author.name} posted a new post`,
        message: content,
      });

      // 4. Emit notification to frontend
      io.emit(`notify:${followerId}`, notif);
    }

    res.json(post);
  });

  return router;
};
