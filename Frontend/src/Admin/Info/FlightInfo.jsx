import { useState } from "react";
import axios from "axios";

export default function FlightInfo() {
  const [formData, setFormData] = useState({
    option: "",
    id: "",
    name: "",
    source: "",
    destination: "",
    date: "",
  });
  const [res, setres] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";
      switch (formData.option) {
        case "id":
          url = `https://skyport-b.onrender.com/admin/flightsbyid/${formData.id}`;
          break;
        case "name":
          url = `https://skyport-b.onrender.com/admin/flightsbyairline/${formData.name}`;
          break;
        case "source":
          url = `https://skyport-b.onrender.com/admin/flightsbysource/${formData.source}`;
          break;
        case "destination":
          url = `https://skyport-b.onrender.com/admin/flightsbydestination/${formData.destination}`;
          break;
        case "date":
          url = `https://skyport-b.onrender.com/admin/flightsbydate/${formData.date}`;
          break;
        case "all":
          url = `https://skyport-b.onrender.com/admin/flights`;
          break;
        default:
          setErrorMessage("Not able to fetch");
          return;
      }

      const response = await axios.get(url);
      setres(
        Array.isArray(response.data.flights)
          ? response.data.flights
          : [response.data.flights]
      );
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
      setErrorMessage("Server error occurred. Check console for details.");
    }
  };
  return (
    <>
      <div className="p-20 flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">
          Add details to Fetch flight info
        </h1>
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <label className="block text-lg font-medium">
              Select a parameter
            </label>
            <select
              name="option"
              value={formData.option}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="id">Airline ID</option>
              <option value="name">Airline Name</option>
              <option value="source">Departure City</option>
              <option value="destination">Destination City</option>
              <option value="date">Departure Date</option>
              <option value="all">All flights details</option>
            </select>
            {formData.option === "id" && (
              <>
                <label className="block text-lg font-medium">Flight ID</label>
                <input
                  name="id"
                  type="text"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Enter Airline ID"
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
              </>
            )}
            {formData.option === "name" && (
              <>
                <label className="block text-lg font-medium">
                  Airline Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Airline Name"
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
              </>
            )}
            {formData.option === "source" && (
              <>
                <label className="block text-lg font-medium">
                  Departure City
                </label>
                <input
                  name="source"
                  type="text"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Enter Flight Departure City"
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
              </>
            )}
            {formData.option === "destination" && (
              <>
                <label className="block text-lg font-medium">
                  Destination City
                </label>
                <input
                  name="destination"
                  type="text"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Enter Flight Destination City"
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
              </>
            )}
            {formData.option === "date" && (
              <>
                <label className="block text-lg font-medium">Date</label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Enter departure date"
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
              </>
            )}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-10 bg-white rounded-xl shadow overflow-x-auto ">
          <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">
            Flight Details
          </h2>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-orange-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border">Flight ID</th>
                <th className="px-4 py-3 border">Airline Name</th>
                <th className="px-4 py-3 border">Departure</th>
                <th className="px-4 py-3 border">Departure Date</th>
                <th className="px-4 py-3 border">Departure Time</th>
                <th className="px-4 py-3 border">Destination</th>
              </tr>
            </thead>
            <tbody>
              {res.length > 0 ? (
                res.map((flight, index) => (
                  <tr key={index} className="text-gray-800">
                    <td className="px-4 py-2 border">{flight.flightId}</td>
                    <td className="px-4 py-2 border">{flight.airline}</td>
                    <td className="px-4 py-2 border">{flight.source}</td>
                    <td className="px-4 py-2 border">
                      {new Date(flight.depart_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">{flight.depart_time}</td>
                    <td className="px-4 py-2 border">{flight.destination}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No flights found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          {errorMessage && (
            <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
