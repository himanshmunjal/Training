import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/pp.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2211/login", {
        email,
        password
      });
  
      if (response.data && response.data.token) {
        setError("");
        alert(`Passenger ID: ${response.data.passenger_id}`); // Optional
        navigate("/user");
      } else {
        setError("Login failed. Please check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
        }}
      ></div>

      {/* Glass Effect Login Box (Ensuring No Blur Inside) */}
      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>} {/* ✅ Show error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label>
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:text-orange-500">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
          >
            Login
          </button>

          <p className="text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/user/signup-user" className="text-orange-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
