import axios from "axios";
import { useState } from "react";

export default function Support() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    Pass_id: "",
    airline: "",
    message: "",
    name:"",
    date:"",
  });

  const [submittedComplaint, setSubmittedComplaint] = useState(null); // ✅ Stores registered complaint

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setError("");

    try {
      const response = await axios.post("http://localhost:2211/user/submit", {
        pass_id: parseInt(formData.Pass_id, 10),
        pass_name: formData.name,
        airline: formData.airline,
        message: formData.message,
        date: formData.date
      });
      if (response.status === 200) {
        alert("Feedback registered successfully!");
        setSubmittedComplaint(formData);
      } else {
        setError("Failed to register complaint. Please try again.");
      }
      console.log("Response from server:", response.data);
    } catch (error) {
      if (error.response) {
        console.log("Server Response:", error.response.data);
        setError(error.response.data.error || "Error occurred.");
      } else {
        setError("Network error. Server might be down.");
      }
    }

    console.log("Submitted Support Request:", formData);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-serif p-5 text-orange-500">
          Customer Complaint Registration
        </h1>
      </div>

      <div className="bg-white shadow-2xl rounded-xl p-6 max-w-5xl mx-auto mt-10 mb-5">
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Passenger ID
              </label>
              <input
                type="number"
                name="Pass_id"
                value={formData.Pass_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Airline
              </label>
              <input
                type="text"
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Display Registered Complaint */}
      {submittedComplaint && (
        <div className="mt-6 p-4 mb-7 bg-white shadow-md rounded max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-orange-600">
            Feedback Details
          </h3>
          <p>
            <strong>Name:</strong> {submittedComplaint.name}
          </p>
          <p>
            <strong>Passenger ID:</strong> {submittedComplaint.Pass_id}
          </p>
          <p>
            <strong>Airline:</strong> {submittedComplaint.airline}
          </p>
          <p>
            <strong>Message:</strong> {submittedComplaint.message}
          </p>
          <p>
            <strong>Date:</strong> {submittedComplaint.date}
          </p>
          <p className="text-center">
            <strong>Our team will reach out to you within 24 Hours.</strong>
          </p>
        </div>
      )}
    </>
  );
}