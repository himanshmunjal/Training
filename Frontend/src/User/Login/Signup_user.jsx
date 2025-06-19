import { React, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/pp.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    pass_name: "",
    pass_contact: "",
    pass_email: "",
    pass_password: "",
    confirmPassword: "",
    aadhar_passport: "", // Stores additional info based on user type
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://skyport-b.onrender.com/user/signup", {
        pass_name: formData.pass_name,
        pass_contact: formData.pass_contact,
        pass_email: formData.pass_email,
        pass_password: formData.pass_password,
        aadhar_passport: formData.aadhar_passport,
      });
      if (response.status === 200) {
        const { passenger_id } = response.data;
        
        alert(`Signup successful! Your Passenger ID is: ${passenger_id}\nKindly remember it for future reference.`);

        navigate("/user");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
      return;
    }

    if (
      !formData.pass_name ||
      !formData.pass_contact ||
      !formData.pass_email ||
      !formData.pass_password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    if (!passwordRegex.test(formData.pass_password)) {
      setError(
        "Password must be at least 8 characters, include a number, an uppercase letter, and a special character."
      );
      return;
    }

    if (formData.pass_password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Signup Successful:", formData);
    navigate("/user"); // Redirect to main page after signup
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

      {/* Glass Effect Signup Box */}
      <div className="relative backdrop-blur-lg bg-white/30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Signup as User
        </h2>
        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name<sup className="text-red-400"> *</sup></label>
            <input
              type="text"
              name="pass_name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact<sup className="text-red-400"> *</sup></label>
            <input
              type="text"
              name="pass_contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
              className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email<sup className="text-red-400"> *</sup></label>
            <input
              type="email"
              name="pass_email"
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
              name="pass_password"
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

          <div>
            <label className="block text-gray-700">Aadhar/Passport ID</label>
            <input
              type="text"
              name="aadhar_passport"
              value={formData.extraInfo}
              onChange={handleChange}
              placeholder="Enter your ID"
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
            <Link
              to="/user/login-user"
              className="text-orange-500 hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
