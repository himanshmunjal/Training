import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Navbar() {
  const [darkMode, setDarkMode] = useState(false); // Default Light Mode

  return (
    <nav
      className={`sticky z-50 top-0 w-full flex items-center justify-between p-4 shadow-md backdrop-blur-lg border ${
        darkMode
          ? "bg-gray-900/80 text-white border-gray-700"
          : "bg-white/80 text-black border-gray-300"
      }`}
    >
      {/* Left Side: Title */}
      <h2 className="text-2xl font-bold ml-4 text-orange-500">
        <Link to="/">🛫🛬 SkyPort</Link>
      </h2>

      {/* Center: Navigation Options */}
      <ul className="flex space-x-6">
        <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
          <Link to="/user">Home</Link>
        </li>
        <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
          <Link to="/user/about">About Us</Link>
        </li>
        <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
          <Link to="/user/flight-status">Flight Status</Link>
        </li>
        <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
          <Link to="/user/flight-bookings">Flight Bookings</Link>
        </li>
        <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
          <Link to="/user/baggage-tracker">Baggage Info</Link>
        </li>
      </ul>
        {/* Theme Toggle */}
        <label className="relative flex items-center cursor-pointer">
          <span className="text-sm mr-3">🌞</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="hidden"
          />
          <div className="w-14 h-7 bg-gray-400 rounded-full shadow-inner relative transition-all duration-300">
            <div
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                darkMode ? "translate-x-7" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm ml-3">🌙</span>
        </label>
    </nav>
  );
}

export default Navbar;
