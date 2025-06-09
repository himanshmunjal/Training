import {React, useState} from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/pp.avif";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    logintype: "default",
    extraInfo: "", // Stores additional info based on user type
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Password Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Check if a valid login type is selected
    if (formData.logintype === "default") {
      alert("Please select a valid login type.");
      return;
    }

    console.log("Signup Data:", formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: "blur(8px)" }}
      ></div>

      {/* Glass Effect Signup Box */}
      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Signup as User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          {/* Login Type Dropdown */}
          <div>
            <label className="block text-gray-700">Login Type</label>
            <select
              name="logintype"
              value={formData.logintype}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            >
              <option value="default">--Select User Type--</option>
              <option value="user">Indian National</option>
              <option value="foreign">Foreign National</option>
              <option value="admin">Admin</option>
              <option value="staff">Airline Staff</option>
            </select>
          </div>

          {/* Conditionally Render Extra Input Based on User Type */}
          {formData.logintype === "user" && (
            <div>
              <label className="block text-gray-700">Aadhar/PAN/Voter ID</label>
              <input
                type="text"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                placeholder="Enter your ID"
                required
                className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
              />
            </div>
          )}

          {formData.logintype === "foreign" && (
            <div>
              <label className="block text-gray-700">Passport Number</label>
              <input
                type="text"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                placeholder="Enter your Passport Number"
                required
                className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
              />
            </div>
          )}

          {formData.logintype === "admin" && (
            <div>
              <label className="block text-gray-700">Admin Key</label>
              <input
                type="text"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                placeholder="Enter your Admin Key"
                required
                className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
              />
            </div>
          )}

          {formData.logintype === "staff" && (
            <div>
              <label className="block text-gray-700">Employee ID</label>
              <input
                type="text"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                placeholder="Enter your Employee ID"
                required
                className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
          >
            Signup
          </button>

          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/user/login-user" className="text-orange-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
