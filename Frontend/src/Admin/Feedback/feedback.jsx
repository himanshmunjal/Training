import axios from "axios";
import { useState } from "react";

export default function Feedback() {
  const [formData, setFormData] = useState({
    date: "",
    airline: "",
    through: "",
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://skyport-b.onrender.com/admin/feedback",
        formData
      );
      if (response.status === 200) {
        setFeedbacks(response.data.complaint || []);
        setSuccessMessage("Feedback data fetched successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("Issue in fetching Feedbacks. Try again later!");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setErrorMessage("Server error occurred. Check console for details.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-10">
        Feedback Portal
      </h1>

          {/* existing form contents remain unchanged */}


      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        
        <form onSubmit={handlesubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Fetch Feedback Through
              </label>
              <select
                name="through"
                value={formData.through}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" disabled>
                  Select Parameter
                </option>
                <option value="Airline">Airline</option>
                <option value="Date">Date</option>
              </select>
            </div>

            {formData.through === "Airline" && (
              <div className="col-span-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Airline
                </label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="e.g. Indigo, Air India"
                />
              </div>
            )}

            {formData.through === "Date" && (
              <div className="col-span-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 p-3 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">
          Feedback Results
        </h2>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-orange-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 border">Passenger Name</th>
              <th className="px-4 py-3 border">Passenger ID</th>
              <th className="px-4 py-3 border">Airline</th>
              <th className="px-4 py-3 border">Feedback</th>
              <th className="px-4 py-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((adv, index) => (
              <tr key={index}>
                <td className="p-3 border">{adv.pass_name}</td>
                <td className="p-3 border">{adv.pass_id}</td>
                <td className="p-3 border">{adv.airline}</td>
                <td className="p-3 border">{adv.message}</td>
                <td className="p-3 border">{adv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
