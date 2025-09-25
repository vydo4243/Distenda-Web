import React, { useState, useEffect } from "react";
import NotificationCard from "./NotificationCard";
import Cookies from "js-cookie";
import { getNotificationsByUser } from "../../../services/notification.service";
import Loading from "../../../components/Loading";
// import { io } from "socket.io-client"; // 👉 import socket

// const socket = io(process.env.REACT_APP_API_BASE_URL, {
//   withCredentials: true,
// });

function NotificationsPage() {
  const [dynamicNotifications, setDynamicNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = Cookies.get("user_token");

      if (token) {
        setLoading(true);
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/notification/check-expiry`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ userToken: token }),
          }
        );

        const backendNotis = await getNotificationsByUser(token);
        if (Array.isArray(backendNotis)) {
          setDynamicNotifications(
            backendNotis.map((noti) => ({
              title: noti.NotificationMessage,
              date: new Date(noti.createdBy?.createdAt).toLocaleDateString(
                "vi-VN"
              ),
              time: new Date(noti.createdBy?.createdAt).toLocaleTimeString(
                "vi-VN"
              ),
              link: noti.NotificationLink || "/user/notification",
            }))
          );
        } else {
          setDynamicNotifications([]);
        }
        setLoading(false);
      }
    };

    fetchNotifications();

    // 🧡 Khi có socket event "newNotification", tự động fetch lại
    // socket.on("new_notification", () => {
    //   console.log("🔔 Có thông báo mới!");
    //   fetchNotifications();
    // });

    // return () => {
    //   socket.off("new_notification"); // 👈 Dọn dẹp event
    // };
  }, []);

  const sortedNotifications = dynamicNotifications.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB - dateA;
  });
  if (loading) return <Loading />;
  return (
    <main className="flex relative max-md:flex-col bg-white bg-opacity-10 backdrop-blur-[10px] pb-[129px] px-[33px] max-md:pb-24 max-md:max-w-full">
      {/* Content Area */}
      <div className="flex flex-col md:order-1 w-[78%] max-md:w-full pr-[69px] max-md:pr-0 pt-[34px] max-md:ml-0">
        <div className="flex relative flex-col items-center w-full leading-none max-md:max-w-full">
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification, index) => (
              <div key={index} className="mb-[18px] w-full">
                <NotificationCard {...notification} />
              </div>
            ))
          ) : (
            <div>Không có thông báo nào.</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default NotificationsPage;
