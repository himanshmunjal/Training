import { useState } from "react";
import axios from "axios";

export default function Status() {
  const [formData, setFormData] = useState({
    airline: "",
    flight_id: "",
    date: "",
    source: "",
    destination: "",
    flight_status: "",
    depart_terminal: "",
    arrival_terminal: "",
    depart_time: "",
    arrival_time: ""
  });

  const [errorMessage, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://skyport-b.onrender.com/admin/status", {
        airline: formData.airline,
        flight_id: formData.flight_id,
        date: formData.date,
        source: formData.source,
        destination: formData.destination,
        flight_status: formData.flight_status,
        depart_terminal: formData.depart_terminal,
        arrival_terminal: formData.arrival_terminal,
        depart_time: formData.depart_time,
        arrival_time: formData.arrival_time
      });
      if (response.status === 200) {
        setSuccessMessage("Flight details added successfully");
      } else {
        setError("⚠️ Failed to add flight details. Please check your input.");
      }
    } catch (error) {
      console.error("Error Adding flight details:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-semibold text-orange-600 mb-6 mt-6">
        Add Flight Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4 mb-6"
      >
        {[
          { label: "Airline Name", name: "airline", type: "text" },
          { label: "Flight Number", name: "flight_id", type: "text" },
          { label: "Flight Status", name: "flight_status", type: "text" },
          { label: "Source", name: "source", type: "text" },
          { label: "Departure Terminal", name: "depart_terminal", type: "number" },
          { label: "Destination", name: "destination", type: "text" },
          { label: "Arrival Terminal", name: "arrival_terminal", type: "number" },
          { label: "Departure Time", name: "depart_time", type: "time" },
          { label: "Arrival Time", name: "arrival_time", type: "time" },
          { label: "Date", name: "date", type: "date" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-orange-300"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-orange-600 text-white font-bold rounded hover:bg-orange-700 transition"
        >
          Submit
        </button>
      </form>
      {successMessage && (
          <div className="m-4 text-green-700 bg-green-100 border border-green-300 p-3 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="m-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
            {errorMessage}
          </div>
        )}
    </div>
  );
}
