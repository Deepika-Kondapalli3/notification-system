import React from "react";
import NotificationList from "../components/NotificationList";

function Notifications({ user, notifications }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {user ? (
        <NotificationList user={user} notifications={notifications} />
      ) : (
        <p>Please login to see notifications.</p>
      )}
    </div>
  );
}

export default Notifications;
