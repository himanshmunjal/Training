import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css"; // If global styles are defined

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    localStorage.removeItem("passenger_id"); // Optional
    navigate("/"); // Redirect to home or login
  };

  return (
    <nav
      className={`sticky z-50 top-0 w-full flex items-center justify-between p-4 shadow-md backdrop-blur-lg border ${
        darkMode
          ? "bg-gray-900/80 text-white border-gray-700"
          : "bg-white/80 text-black border-gray-300"
      }`}
    >
      {/* Left Side: Brand Title */}
      <h2 className="text-2xl font-bold ml-4 text-orange-500">
        <Link to="/">🛫🛬 SkyPort</Link>
      </h2>

      {/* Center: Navigation Menu */}
          <ul className="flex space-x-6">
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
              <Link to="/admin">Home</Link>
            </li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
              <Link to="/admin/about">About Us</Link>
            </li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
              <Link to="/admin/flight-status">Flight Status</Link>
            </li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
              <Link to="/admin/passenger-info">Passenger Info</Link>
            </li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">
              <Link to="/admin/baggage-tracker">Baggage Info</Link>
            </li>
          </ul>

      {/* Right Side: Dark Mode Toggle + Logout */}
      <div className="flex items-center space-x-4 mr-4">
        {/* Theme Toggle */}
        <label className="relative flex items-center cursor-pointer">
          <span className="text-sm mr-2">🌞</span>
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
          <span className="text-sm ml-2">🌙</span>
        </label>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`px-4 py-2 rounded font-semibold transition-all duration-300 ${
            darkMode
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

