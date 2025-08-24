import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const API = "http://localhost:5000/api";
// Connect to your backend Socket.IO server
const socket = io("http://localhost:5000");

// Bob's user ID
const BOB_ID = "68aae988b323636b11d397bb";

export default function App() {
  const [user, setUser] = useState({ _id: BOB_ID, name: "Bob" });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        // Fetch existing notifications for Bob
        const res = await axios.get(`${API}/notifications/${BOB_ID}`);
        setNotifications(res.data || []);

        // Listen for real-time notifications for Bob
        socket.on(`notify:${BOB_ID}`, (notif) => {
          setNotifications((prev) => [notif, ...prev]);
        });
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    }
    fetchNotifications();

    // Clean up socket listener on unmount
    return () => {
      socket.off(`notify:${BOB_ID}`);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home notifications={notifications} />} />
        <Route path="/notifications" element={<Notifications user={user} notifications={notifications} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
