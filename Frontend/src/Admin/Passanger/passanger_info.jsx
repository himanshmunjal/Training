import { useState } from "react";

export default function PassangerInfo() {
  const [passengers, setPassengers] = useState({
    pass_name: "",
    pass_id: "",
    pass_flight: "",
    search_by: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Passenger Details:", passengers);
  };
  const handleChange = (e) => {
    setPassengers({ ...passengers, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-7 mb-5">
      <h2 className="text-2xl text-center text-orange-500 font-sans p-5">
        Enter Passanger Details
      </h2>
      <form
        onSubmit={handlesubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        <label className="block text-lg font-medium">Select passanger by</label>
        <select
        name="search_by" value={passengers.search_by}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 mt-2 border border-gray-300 rounded focus:ring focus:ring-orange-300">
          <option value="" disabled>Select Search Criteria</option>
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="flight">Flight</option>
        </select>
        {passengers.search_by === "name" && (
          <div>
            <label className="block text-lg font-medium">Passenger Name</label>
            <input
              type="text"
              name="pass_name"
              value={passengers.pass_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring mb-5 mt-2 focus:ring-orange-300"
            />
          </div>
        )}
        {passengers.search_by === "id" && (
          <div>
            <label className="block text-lg font-medium">Passenger ID</label>
            <input
              type="number"
              name="pass_id"
              value={passengers.pass_name}
              onChange={handleChange}
              required
              className="w-full p-2 border mb-5 mt-2 border-gray-300 rounded focus:ring focus:ring-orange-300"
            />
          </div>
        )}
        {passengers.search_by === "flight" && (
          <div>
            <label className="block text-lg font-medium">Flight Number</label>
            <input
              type="text"
              name="pass_flight"
              value={passengers.pass_name}
              onChange={handleChange}
              required
              className="w-full p-2 border mb-4 mt-2 border-gray-300 rounded focus:ring focus:ring-orange-300"
            />
            <label className="block text-lg font-medium">Passanger Name(if Applied)</label>
            <input
              type="text"
              name="pass_id"
              value={passengers.pass_name}
              onChange={handleChange}
              className="w-full p-2 border mb-5 mt-2 border-gray-300 rounded focus:ring focus:ring-orange-300"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300"
        >
          Search Passenger
        </button>
      </form>
    </div>
  );
}
