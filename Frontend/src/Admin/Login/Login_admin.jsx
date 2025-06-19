import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/pp.avif";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [admin_email, setEmail] = useState("");
  const [admin_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("https://skyport-b.onrender.com/admin/login", {
      admin_email: admin_email,
      admin_password: admin_password,
    });
      if (response.status === 200 && response.data.admin_key && response.data.token) {
        alert("Login successful");
        setError("");
        localStorage.setItem("role", "admin");
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("admin_key",response.data.admin_key);
        navigate("/admin");
      } else {
        setError("Login Failed. Check Credantials.");
        console.log(response.data);
      }
    }catch(error){
      console.error("Error during login:", error);
      // alert("An error occurred during login. Please try again.");
      setError("Login Failed. Check Credantials.")
    }
    console.log("Email:", admin_email, "Password:", admin_password);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
        }}
      ></div>

      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={admin_email}
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
              value={admin_password}
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
            <Link to="/admin/signup-admin" className="text-orange-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
