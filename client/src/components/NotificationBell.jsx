// components/Navbar/NotificationBell.js
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa'; // Example icon
import { useNotifications } from '../contexts/NotificationContext'; // Adjust path
import { Link } from 'react-router-dom';// Or from 'react-router-dom'

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setIsOpen(false); // Close dropdown on click
    // Optionally navigate using Link or router.push(notification.link)
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (timestamp) => {
     return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' +
            new Date(timestamp).toLocaleDateString([], { day: '2-digit', month: 'short'});
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Notifications"
      >
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/2 translate-x-1/2">
             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                 {unreadCount > 9 ? '9+' : unreadCount}
             </span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
          <div className="py-1">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              {notifications.length > 0 && unreadCount > 0 && (
                 <button
                     onClick={() => { markAllAsRead(); /* setIsOpen(false); optional */}}
                     className="text-sm text-blue-600 hover:text-blue-800"
                 >
                     Mark all as read
                 </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-500">No new notifications.</p>
            ) : (
              <ul className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <li key={notification.id} className={`${!notification.read ? 'bg-blue-50' : ''}`}>
                    <Link href={notification.link || '#'} legacyBehavior>
                      <a
                        onClick={() => handleNotificationClick(notification)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <p className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(notification.timestamp)}</p>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
             {notifications.length > 0 && (
                 <div className="px-4 py-2 border-t text-center">
                     <Link href="/notifications" legacyBehavior>
                         <a onClick={() => setIsOpen(false)} className="text-sm text-blue-600 hover:text-blue-800">
                             View all notifications
                         </a>
                     </Link>
                 </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;