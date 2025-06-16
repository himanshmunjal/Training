import { useState } from "react";
import axios from "axios";

export default function Status() {
  const [formData, setFormData] = useState({
    airline: "",
    flight_id: "",
    date: "",
  });
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:2211/user/status", {
        params: {
          airline: formData.airline,
          flight_id: formData.flight_id,
          date: formData.date,
        },
      });

      if (response.status === 200 && response.data.flight) {
        setFlightData(response.data.flight);
        setError(null);
        console.log("Flight data received:", response.data.flight);
      } else {
        setFlightData(null);
        setError("Flight not found or no data returned.");
      }
    } catch (err) {
      setFlightData(null);
      console.error("Error fetching flight data:", err);
      setError("An error occurred while fetching flight details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
      <h1 className="text-3xl font-semibold text-orange-600 mb-6">
        Enter the details to fetch flight details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="space-y-4">
          <label className="block text-lg font-medium">Airline Name</label>
          <input
            type="text"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
          />

          <label className="block text-lg font-medium">Flight Number</label>
          <input
            type="text"
            name="flight_id"
            value={formData.flight_id}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
          />

          <label className="block text-lg font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
        >
          Submit
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {flightData && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-xl">
          <h2 className="text-xl font-bold mb-2 text-green-700">Flight Details</h2>
          <p><strong>Flight ID:</strong> {flightData.flight_id}</p>
          <p><strong>Airline:</strong> {flightData.airline}</p>
          <p><strong>Date:</strong> {flightData.date}</p>
          <p><strong>Status:</strong> {flightData.flight_status}</p>
          <p><strong>Source:</strong> {flightData.source}</p>
          <p><strong>Destination:</strong> {flightData.destination}</p>
        </div>
      )}
    </div>
  );
}
