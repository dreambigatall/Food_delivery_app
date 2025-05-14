// "use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">FoodOrder</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                Home
              </Link>
              <Link to="/menu" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                Menu
              </Link>
              {isAuthenticated && (
                <Link to="/orders" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                  My Orders
                </Link>
              )}
              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 flex items-center"
                  >
                    Admin
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${isAdminMenuOpen ? "rotate-180" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isAdminMenuOpen && (
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          Manage Orders
                        </Link>
                        <Link
                          to="/admin/menu"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminMenuOpen(false)}
                        >
                          Manage Menu
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/cart" className="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="ml-3 relative">
                

                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 mr-2">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-orange-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            {isAuthenticated && (
              <Link
                to="/orders"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/orders"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Orders
                </Link>
                <Link
                  to="/admin/menu"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Menu
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { useCart } from "../contexts/CartContext"
// import { useNotifications } from "../contexts/NotificationContext"  // import notifications

// const Navbar = () => {
//   const { user, isAuthenticated, isAdmin, logout } = useAuth()
//   const { itemCount } = useCart()
//   const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()  // notifications data
//   const navigate = useNavigate()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
//   const [showNotif, setShowNotif] = useState(false)  // notification dropdown state
//    console.log(notifications)
//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   const toggleNotif = () => {
//     setShowNotif(prev => !prev)
//     if (!showNotif && unreadCount > 0) {
//       markAllAsRead()
//     }
//   }

//   return (
//     <nav className="bg-orange-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left section */}
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <span className="text-xl font-bold">FoodOrder</span>
//             </Link>
//             <div className="hidden md:ml-6 md:flex md:space-x-4">
//               {/* existing links */}
//               <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">Home</Link>
//               <Link to="/menu" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">Menu</Link>
//               {isAuthenticated && <Link to="/orders" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">My Orders</Link>}
//               {isAdmin && (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
//                     className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 flex items-center"
//                   >
//                     Admin
//                     <svg
//                       className={`ml-1 h-4 w-4 transition-transform ${isAdminMenuOpen ? "rotate-180" : ""}`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                   {isAdminMenuOpen && (
//                     <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                       <div className="py-1">
//                         <Link to="/admin" onClick={() => setIsAdminMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
//                         <Link to="/admin/orders" onClick={() => setIsAdminMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage Orders</Link>
//                         <Link to="/admin/menu" onClick={() => setIsAdminMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage Menu</Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Notification bell */}
//             {isAuthenticated && (
//               <div className="relative">
//                 <button onClick={toggleNotif} className="p-2 rounded-full hover:bg-orange-700 focus:outline-none">
//                   <i className="fas fa-bell"></i>
//                   {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">{unreadCount}</span>}
//                 </button>
//                 {showNotif && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-80 z-50">
//                     <div className="p-2 border-b font-semibold">Notifications</div>
//                     {notifications.length === 0 ? (
//                       <div className="p-4 text-sm text-gray-600">No notifications</div>
//                     ) : (
//                       notifications.map(n => (
//                         <Link
//                           key={n.id}
//                           to={n.link}
//                           onClick={() => markAsRead(n.id)}
//                           className={`block px-4 py-2 text-sm hover:bg-gray-100 ${n.read ? '' : 'font-bold'}`}
//                         >
//                           {n.message}
//                         </Link>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Cart */}
//             <Link to="/cart" className="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
//               Cart
//               {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{itemCount}</span>}
//             </Link>

//             {/* Auth Links */}
//             {isAuthenticated ? (
//               <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">Logout</button>
//             ) : (
//               <>
//                 <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">Login</Link>
//                 <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700">Register</Link>
//               </>
//             )}
//           </div>

//           {/* Mobile */}
//           <div className="flex md:hidden items-center">
//             {/* you can optionally add mobile bell here */}
//             <Link to="/cart" className="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 mr-2">
//               Cart
//               {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{itemCount}</span>}
//             </Link>
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-orange-700 focus:outline-none">
//               {isMenuOpen ? (
//                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu remains unchanged */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           {/* ...mobile links as before... */}
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar


//Here’s the complete updated `Navbar.jsx` with an inline SVG bell icon (no external CSS), the fixed `toggleNotif` logic, and your notification dropdown. This preserves all your existing links/layout and only injects the bell:


// "use client";

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useCart } from "../contexts/CartContext";
// import { useNotifications } from "../contexts/NotificationContext";

// const Navbar = () => {
//   const { user, isAuthenticated, isAdmin, logout } = useAuth();
//   const { itemCount } = useCart();
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     markAllAsRead,
//   } = useNotifications();
//   const navigate = useNavigate();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
//   const [showNotif, setShowNotif] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const toggleNotif = () => {
//     setShowNotif((prev) => {
//       if (!prev && unreadCount > 0) {
//         markAllAsRead();
//       }
//       return !prev;
//     });
//   };

//   return (
//     <nav className="bg-orange-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left section */}
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <span className="text-xl font-bold">FoodOrder</span>
//             </Link>
//             <div className="hidden md:ml-6 md:flex md:space-x-4">
//               <Link
//                 to="/"
//                 className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/menu"
//                 className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//               >
//                 Menu
//               </Link>
//               {isAuthenticated && (
//                 <Link
//                   to="/orders"
//                   className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//                 >
//                   My Orders
//                 </Link>
//               )}
//               {isAdmin && (
//                 <div className="relative">
//                   <button
//                     onClick={() =>
//                       setIsAdminMenuOpen((open) => !open)
//                     }
//                     className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 flex items-center"
//                   >
//                     Admin
//                     <svg
//                       className={`ml-1 h-4 w-4 transition-transform ${
//                         isAdminMenuOpen ? "rotate-180" : ""
//                       }`}
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 
//                            10.586l3.293-3.293a1 1 0 111.414 
//                            1.414l-4 4a1 1 0 01-1.414 
//                            0l-4-4a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   {isAdminMenuOpen && (
//                     <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                       <div className="py-1">
//                         <Link
//                           to="/admin"
//                           onClick={() => setIsAdminMenuOpen(false)}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Dashboard
//                         </Link>
//                         <Link
//                           to="/admin/orders"
//                           onClick={() => setIsAdminMenuOpen(false)}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Manage Orders
//                         </Link>
//                         <Link
//                           to="/admin/menu"
//                           onClick={() => setIsAdminMenuOpen(false)}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Manage Menu
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Notification bell */}
//             {isAuthenticated && (
//               <div className="relative">
//                 <button
//                   onClick={toggleNotif}
//                   className="p-2 rounded-full hover:bg-orange-700 focus:outline-none"
//                 >
//                   {/* Inline bell SVG */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 17h5l-1.405-1.405A2.032 
//                          2.032 0 0118 14.158V11a6.002 
//                          6.002 0 00-4-5.659V5a2 2 
//                          0 10-4 0v.341C7.67 6.165 6 
//                          8.388 6 11v3.159c0 .538-.214 
//                          1.055-.595 1.436L4 17h5m6 
//                          0v1a3 3 0 11-6 0v-1m6 0H9"
//                     />
//                   </svg>
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-black-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//                 {showNotif && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-80 z-50">
//                     <div className="p-2 border-b font-semibold">
//                       Notifications
//                     </div>
//                     {notifications.length === 0 ? (
//                       <div className="p-4 text-sm text-gray-600">
//                         No notifications
//                       </div>
//                     ) : (
//                       notifications.map((n) => (
//                         <Link
//                           key={n.id}
//                           to={n.link}
//                           onClick={() => markAsRead(n.id)}
//                           className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
//                             n.read ? "" : "font-bold"
//                           }`}
//                         >
//                           {n.message}
//                         </Link>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//             >
//               Cart
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                   {itemCount}
//                 </span>
//               )}
//             </Link>

//             {/* Auth Links */}
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile */}
//           <div className="flex md:hidden items-center">
//             <Link
//               to="/cart"
//               className="relative px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 mr-2"
//             >
//               Cart
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                   {itemCount}
//                 </span>
//               )}
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen((open) => !open)}
//               className="inline-flex items-center justify-center p-2 rounded-md hover:bg-orange-700 focus:outline-none"
//             >
//               {isMenuOpen ? (
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           {/* ...your existing mobile links here... */}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

