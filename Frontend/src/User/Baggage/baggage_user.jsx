import axios from "axios";
import { useState } from "react";

export default function Baggage() {
  const [formData, setFormData] = useState({
    passenger_name: "",
    airline: "",
    baggage_id: "",
    pass_id: "",
  });

  const [errorMessage, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("");
  const [baggageDetails, setBaggageDetails] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://skyport-b.onrender.com/user/baggage", {
        params: {
          pass_id: formData.pass_id,
          baggage_id: formData.baggage_id,
          passenger_name: formData.passenger_name,
          airline: formData.airline,
        },
      });
      if (response.status === 200) {
        setSuccessMessage("Baggage details fetched successfully!");
        console.log(response.data.baggage);
        setBaggageDetails(response.data.baggage);
      }
    } catch (error) {
      console.error("Error fetching baggage details:", error);
      setError("Failed to fetch baggage details. Please try again.");
    }
  };

  return(
    <>
      {" "}
      {/* Fixed Header */}
      <div className=" flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">
          Enter the details to fetch lost Baggage details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="space-y-4">
            <label className="block text-lg font-medium">
              Passenger ID<sup className="text-red-400"> *</sup>
            </label>
            <input
              type="number"
              name="pass_id"
              value={formData.pass_id}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            />

            <label className="block text-lg font-medium">
              Baggage ID<sup className="text-red-400"> *</sup>
            </label>
            <input
              type="text"
              name="baggage_id"
              value={formData.baggage_id}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            />

            <label className="block text-lg font-medium">
              Passanger Name<sup className="text-red-400"> *</sup>
            </label>
            <input
              type="text"
              name="passenger_name"
              value={formData.passenger_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            />

            <label className="block text-lg font-medium">
              Airline<sup className="text-red-400"> *</sup>
            </label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
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
      </div>
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
      {/* flex flex-col items-center justify-center */}
      {baggageDetails && (
        <div className="flex items-center justify-center bg-gray-100 p-10">
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded shadow-md w-full max-w-xl text-gray-800">
            <h2 className="text-2xl font-bold mb-2 text-green-700">Baggage Details</h2>
            <p className="text-xl">
              <strong>Passenger Name:</strong> {baggageDetails.pass_name}
            </p>
            <p className="text-xl">
              <strong>Passenger ID:</strong> {formData.pass_id}
            </p>
            <p className="text-xl">
              <strong>Baggage ID:</strong> {baggageDetails.baggage_id}
            </p>
            <p className="text-xl">
              <strong>Airline:</strong> {baggageDetails.airline}
            </p>
            <p className="text-xl">
              <strong>Collection Center:</strong> {baggageDetails.collection}
            </p>
          </div>
        </div>
      )}
    </>
  );
}