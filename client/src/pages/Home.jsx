import React from "react";
import NotificationBell from "../components/NotificationBell";

function Home({ notifications }) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome to Insyd</h1>
        <NotificationBell notifications={notifications} />
      </div>
      <p className="mt-2">This is a notification system.</p>
    </div>
  );
}

export default Home;
