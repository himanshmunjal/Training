import { useState } from "react";
import axios from "axios";

export default function Baggage() {
  const [formData, setFormData] = useState({
    baggage_id: "",
    pass_name: "",
    place: "",
    date: "",
    collection: "",
    airline: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://skyport-b.onrender.com/admin/baggage", formData);
      if (response.status === 200) {
        setSuccessMessage("Baggage details added successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to add baggage details. Please try again.");
        setSuccessMessage("");
        console.error("Error fetching baggage details:", response.data);
      }
      console.log("Flight Details:", formData);
    } catch (error) {
      console.error("Error during fetching baggage details:", error);
      setErrorMessage("An error occurred while fetching baggage details. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <> {/* Fixed Header */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 ">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">
          Enter the details to Add lost Baggage details
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
          <div className="space-y-4">
            <label className="block text-lg font-medium">Baggage ID</label>
            <input
              type="text"
              name="baggage_id"
              value={formData.baggage_id}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            />

            <label className="block text-lg font-medium">Passanger Name</label>
            <input
              type="text"
              name="pass_name"
              value={formData.pass_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            />

            <label className="block text-lg font-medium">Found At</label>
            <input
              type="text"
              name="place"
              value={formData.place}
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

            <label className="block text-lg font-medium">Airline</label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300"
            />

            <label className="block text-lg font-medium">Collection Point</label>
            <input
              type="text"
              name="collection"
              value={formData.collection}
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
        {successMessage && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 p-3 rounded w-full max-w-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded w-full max-w-md">
            {errorMessage}
          </div>
        )}

      </div>
    </>
  );
}