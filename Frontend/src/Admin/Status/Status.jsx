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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:2211/admin/status",{
        airline: formData.airline,
        flight_id: formData.flight_id,
        date: formData.date,
        source: formData.source,
        destination: formData.destination,
        flight_status: formData.flight_status,
      });
      if (response.status === 200) {
        alert("Flight details added successfully");
      } else {
        console.log(response.data);
        alert("Failed to add flight details. Please check your input.");
      }
    }catch(error){
      console.error("Error Adding flight details:", error);
      alert("An error occurred while fetching flight details. Please try again.");
    }
    
    console.log("Flight Details:", formData);
  };
  
  return (
    <> {/* Fixed Header */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">Enter the details to fetch flight details</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="space-y-4">
            <label className="block text-lg font-medium">Airline Name</label>
            <input type="text" name="airline" value={formData.airline} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />
            
            <label className="block text-lg font-medium">Flight Number</label>
            <input type="text" name="flight_id" value={formData.flight_id} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />
           
            <label className="block text-lg font-medium">Flight Status</label>
            <input type="text" name="flight_status" value={formData.flight_status} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />
            
            <label className="block text-lg font-medium">Source</label>
            <input type="text" name="source" value={formData.source} onChange={handleChange} required 
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-orange-300" />
            
            <label className="block text-lg font-medium">Destination</label>
            <input type="text" name="destination" value={formData.destination} onChange={handleChange} required 
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

// setFormData({
//   airline: "",
//   flight_id: "",
//   date: "",
//   source: "",
//   destination: "",
//   flight_status: "",
// });