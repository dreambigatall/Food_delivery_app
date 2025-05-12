// // contexts/NotificationContext.js
// "use client";  // if you ever move to Next.js App Router––otherwise harmless in CRA/Vite

// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// import io from "socket.io-client";
// import { useAuth } from "./AuthContext";
// import { useQueryClient } from "@tanstack/react-query";

// const NotificationContext = createContext();

// export const useNotifications = () => {
//   return useContext(NotificationContext);
// };

// export const NotificationProvider = ({ children }) => {
//   const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
//   const queryClient = useQueryClient();

//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount]     = useState(0);
//   const [socket, setSocket]               = useState(null);

//   // 1) Establish socket when auth is ready
//   useEffect(() => {
//     if (authLoading) return;                // wait for auth check to finish
//     if (!isAuthenticated || !user) {
//       socket?.disconnect();
//       setSocket(null);
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) return console.warn("No token; cannot connect socket.");

//     const apiUrl =  "http://localhost:3000";
//     const sock   = io(apiUrl, { auth: { token } });
//     setSocket(sock);

//     return () => {
//       sock.disconnect();
//       setSocket(null);
//     };
//   }, [authLoading, isAuthenticated, user]);

//   // 2) Once socket exists, attach listeners
//   useEffect(() => {
//     if (!socket) return;

//     const onNewOrder = (data) => {
//       const note = {
//         id:      data.orderId,
//         message: data.message,
//         link:    isAdmin 
//                    ? `/admin/orders/${data.orderId}`
//                    : `/my-orders/${data.orderId}`,
//         read:    false,
//         ts:      Date.now(),
//       };
//       setNotifications((all) => [note, ...all.slice(0, 19)]);
//       setUnreadCount((c) => c + 1);
//       if (isAdmin) queryClient.invalidateQueries(["adminOrders"]);
//       else        queryClient.invalidateQueries(["myOrders"]);
//     };

//     socket.on("new_order_notification", onNewOrder);

//     return () => {
//       socket.off("new_order_notification", onNewOrder);
//     };
//   }, [socket, isAdmin, queryClient]);

//   // helpers
//   const markAsRead = useCallback((id) => {
//     setNotifications((all) =>
//       all.map((n) =>
//         n.id === id && !n.read ? { ...n, read: true } : n
//       )
//     );
//     setUnreadCount((u) => Math.max(0, u - 1));
//   }, []);

//   const markAllAsRead = useCallback(() => {
//     setNotifications((all) => all.map((n) => ({ ...n, read: true })));
//     setUnreadCount(0);
//   }, []);

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         markAsRead,
//         markAllAsRead,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// contexts/NotificationContext.js
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount]     = useState(0);

  // 1) Establish socket
  useEffect(() => {
    if (authLoading) return;
    // if no auth or user, disconnect existing
    if (!isAuthenticated || !user) {
      if (socketRef.current) {
        console.log("NotificationContext: disconnecting socket (no user)");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("NotificationContext: no token, not connecting");
      return;
    }

    // **Use same URL as your AdminDashboard**
    const SOCKET_URL =  "http://localhost:3000";
    console.log("NotificationContext: connecting to", SOCKET_URL);

    const sock = io(SOCKET_URL, { auth: { token } });
    socketRef.current = sock;

    sock.on("connect", () => {
      console.log("NotificationContext: socket connected id=", sock.id);
    });
    sock.on("connect_error", (err) => {
      console.error("NotificationContext: connection error:", err.message);
    });

    return () => {
      console.log("NotificationContext: cleanup - disconnecting socket");
      sock.disconnect();
      socketRef.current = null;
    };
  }, [authLoading, isAuthenticated, user]);

  // 2) Attach event handlers
  useEffect(() => {
    const sock = socketRef.current;
    if (!sock) return;

    console.log("NotificationContext: attaching listeners");

    // handle new orders (admin) or status updates (user)
    const eventName = isAdmin ? "new_order_notification" : "order_status_update";
    const handler = (data) => {
      console.log(`NotificationContext: received ${eventName}`, data);
      const note = {
        id:      data.orderId || Date.now(),
        message: data.message,
        link:    isAdmin
                    ? `/admin/orders/${data.orderId}`
                    : `/my-orders/${data.orderId}`,
        read:    false,
        ts:      Date.now()
      };
      setNotifications((prev) => [note, ...prev.slice(0, 19)]);
      setUnreadCount((c) => c + 1);
      // invalidate the correct query
      queryClient.invalidateQueries([ isAdmin ? "adminOrders" : "myOrders" ]);
    };

    sock.on(eventName, handler);

    return () => {
      console.log("NotificationContext: removing listener", eventName);
      sock.off(eventName, handler);
    };
  }, [isAdmin, queryClient]);

  const markAsRead = useCallback((id) => {
    setNotifications((all) =>
      all.map((n) => (n.id === id && !n.read ? { ...n, read: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((all) => all.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
