import { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${user._id}`);
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li key={n._id} className="p-2 border rounded">
              <strong>{n.title}</strong> - {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
