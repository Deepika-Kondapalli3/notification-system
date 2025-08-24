// index.js
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

// Import routes
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import notificationsRoute from "./routes/notifications.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute(io)); // Pass io for real-time notifications
app.use("/api/notifications", notificationsRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
