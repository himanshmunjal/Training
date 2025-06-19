import { useState } from "react";
import axios from "axios";

export default function FlightManage() {
  const [formData, setFormData] = useState({
    airline: "",
    flightId: "",
    source: "",
    destination: "",
    depart_date: "",
    depart_time: "",
    arrival_date: "",
    arrival_time: "",
    total: "",
    price: "",
    student: "",
    senior: "",
    armed: "",
    layover: false,
    layoverDuration: "",
    layoverstop: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLayoverChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      layover: { ...formData.layover, [name]: checked },
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://skyport-b.onrender.com/admin/manage",
        formData
      );
      if (response.status === 200) {
        alert("Flight details Added successfully!");
      } else {
        alert("Failed to add baggage details. Please try again.");
        console.error("Error fetching baggage details:", response.data);
      }
      console.log("Flight Details:", formData);
    } catch (error) {
      console.error("Error during fetching baggage details:", error);
      alert(
        "An error occurred while fetching baggage details. Please try again."
      );
    }
  };

  const total = parseInt(formData.total) || 0;
  const available = Math.floor(total * 0.85);
  const student = Math.floor(available * 0.05);
  const senior = Math.floor(available * 0.05);
  const armed = Math.floor(available * 0.05);

  const price = parseInt(formData.price) || 0;
  const n_price = Math.floor(price);
  const s_price = Math.floor(price * 0.95);
  const sen_price = Math.floor(price * 0.94);
  const a_price = Math.floor(price * 0.92);

  return (
    <>
      <div>
        <h1 className="text-3xl text-center font-serif p-5 text-orange-500">
          Schedule Management & Information Page
        </h1>
      </div>

      <div className="bg-slate-100 shadow-2xl rounded-xl p-6 max-w-6xl mx-auto mt-10 mb-5">
        <form onSubmit={handlesubmit}>
          {/* Flight Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
            <div className="lg:col-span-1">
              <label>Airline</label>
              <input
                type="text"
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                placeholder="Airline"
                className="w-full border rounded px-3 py-2"
                required
              />
              {/* <div className="mt-2">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="layover"
                    checked={formData.layover}
                    onChange={handleLayoverChange}
                    className="mr-2"
                  />
                  Has Layover
                </label>
              </div>

              {formData.layover && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">
                      Layover Duration (hh:mm)
                    </label>
                    <input
                      type="text"
                      name="layoverDuration"
                      value={formData.layoverDuration}
                      onChange={handleLayoverChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">
                      Layover Stop Location
                    </label>
                    <input
                      type="text"
                      name="layoverStop"
                      value={formData.layoverstop}
                      onChange={handleLayoverChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
              )} */}
            </div>
            <div className="lg:col-span-1">
              <label>Flight ID</label>
              <input
                type="text"
                name="flightId"
                value={formData.flightId}
                onChange={handleChange}
                placeholder="Flight ID"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Airport or City"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Airport or City"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">Depart</label>
              <input
                type="date"
                name="depart_date"
                value={formData.depart_date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <label className="text-sm text-gray-600 mt-2">
                Departure Time
              </label>
              <input
                type="time"
                name="depart_time"
                value={formData.depart_time}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">Arrival</label>
              <input
                type="date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <label className="text-sm text-gray-600 mt-2">Arrival Time</label>
              <input
                type="time"
                name="arrival_time"
                value={formData.arrival_time}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Ticket Section */}
          <div className="bg-white rounded-md p-4 mt-6 shadow">
            <label className="block text-lg font-medium text-center mb-4 text-gray-700">
              Ticket Distribution
            </label>

            <div className="max-w-sm mx-auto mb-6">
              <label className="block text-sm text-gray-700 mb-1 text-center">
                Total Tickets:
              </label>
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
                className="w-full h-10 px-3 py-2 border rounded text-center"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Tickets Normal Available:
                </label>
                <input
                  type="number"
                  value={available}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Tickets for Students:
                </label>
                <input
                  type="number"
                  value={student}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Tickets for Seniors:
                </label>
                <input
                  type="number"
                  value={senior}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Tickets for Armed Forces:
                </label>
                <input
                  type="number"
                  value={armed}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded"
                />
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-md p-4 mt-10 shadow">
            <label className="block text-lg font-medium text-center mb-4 text-gray-700">
              Ticket Pricing
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Price Per Ticket (Base):
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 border rounded text-center"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Price Per Ticket (Normal):
                </label>
                <input
                  type="number"
                  value={n_price}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded text-center"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Price Per Ticket (Student):
                </label>
                <input
                  type="number"
                  value={s_price}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded text-center"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Price Per Ticket (Senior):
                </label>
                <input
                  type="number"
                  value={sen_price}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded text-center"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Price Per Ticket (Armed):
                </label>
                <input
                  type="number"
                  value={a_price}
                  readOnly
                  className="w-full h-10 px-3 py-2 border bg-gray-100 rounded text-center"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-2xl p-2 rounded hover:bg-blue-700 transition ease-out mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

{
  /* <div className="mt-2">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="layover"
                    checked={formData.layover}
                    onChange={handleChange}
                    className="mr-2 size-4"
                  />
                  Layover
                </label>
              </div>
              {formData.layover && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">
                      Layover Duration (hh:mm)
                    </label>
                    <input
                      type="text"
                      name="layoverDuration"
                      value={formData.layoverDuration}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">
                      Layover Stop Location
                    </label>
                    <input
                      type="text"
                      name="layoverStop"
                      value={formData.layoverStop}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
              )} */
}
