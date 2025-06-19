import {React, useState} from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/pp.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    admin_name: "",
    admin_contact: "",
    admin_email: "",
    admin_password: "",
    confirmPassword: "",
    admin_key: "", // Stores additional info based on user type
    dob: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.admin_name || !formData.admin_contact || !formData.admin_email || !formData.admin_password || !formData.confirmPassword) {
        setError("All fields are required!");
        return;
      }
  
      if (!passwordRegex.test(formData.admin_password)) {
        setError("Password must be at least 8 characters, include a number, an uppercase letter, and a special character.");
        return;
      }
  
      if (formData.admin_password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try{
        const response = await axios.post("http://localhost:2211/admin/signup", {
        admin_name: formData.admin_name,
        admin_contact: parseInt(formData.admin_contact, 10),
        admin_email: formData.admin_email,
        admin_password: formData.admin_password,
        admin_key: parseInt(formData.admin_key, 10),
        dob: formData.dob
      });
      if (response.status === 200) {
        alert("Signup successful");
        console.log(formData);
      } else {
        setError("Signup failed. Please try again.");
      }
      navigate("/admin");
      }catch(error){
        console.error("Error during signup:", error);
        setError("An error occurred during signup. Please try again.");
      }
    };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">\
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: "blur(8px)" }}
      ></div>

      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Signup as Admin</h2>
          {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="admin_name"
              value={formData.admin_name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact</label>
            <input
              type="number"
              name="admin_contact"
              value={formData.admin_contact}
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
              name="admin_email"
              value={formData.admin_email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="Date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Enter your Date of Birth"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="admin_password"
              value={formData.admin_password}
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
    
          <div>
              <label className="block text-gray-700">Admin Key</label>
              <input
                type="number"
                name="admin_key"
                value={formData.admin_key}
                onChange={handleChange}
                placeholder="Enter your Admin Key"
                required
                className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
              />
            </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
          >
            Signup
          </button>

          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/admin/login-admin" className="text-orange-500 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}