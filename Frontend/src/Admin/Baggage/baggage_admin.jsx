import { useState } from "react";

export default function Baggage() {
  const [formData, setFormData] = useState({
    Passanger_Name: "",
    flightNumber: "",
    date: "",
    departure: "",
    destination: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Flight Details:", formData);
  };

  return (
    <> {/* Fixed Header */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">Enter the details to fetch lost Baggage details</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="space-y-4">
          <label className="block text-lg font-medium">Passenger ID</label>
            <input type="text" name="airline" value={formData.airline} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />
            
            <label className="block text-lg font-medium">Passanger Name</label>
            <input type="text" name="Passanger_Namee" value={formData.airline} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />
            
            <label className="block text-lg font-medium">Flight Number</label>
            <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />

            <label className="block text-lg font-medium">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />

          </div>

          <button type="submit" className="w-full mt-6 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
