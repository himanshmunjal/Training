import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, passengers, benefitType } = location.state || {};

  const [passengerDetails, setPassengerDetails] = useState(
    Array(passengers).fill({ name: "", age: "" })
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleConfirm = async () => {
    try {
      await axios.post("https://skyport-b.onrender.com/user/book", {
        flightId: flight.flightId,
        seats: passengerDetails.length,
        benefit: benefitType,
      });
      navigate("/user/confirmation");
    } catch (error) {
      console.error("Booking failed", error);
      alert("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Flight Info */}
        <div className="col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-blue-800">Complete your booking</h2>

          {/* Flight Details Card */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4 border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {flight.source} → {flight.destination}
                </h3>
                <p className="text-sm text-gray-500">{flight.depart_date} • {flight.depart_time} — {flight.arrival_time}</p>
              </div>
              <span className="text-green-700 font-semibold text-sm border border-green-700 px-2 py-1 rounded">
                Cancellation Fees Apply
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Flight:</strong> {flight.airline} ({flight.flightId})</p>
              <p><strong>Baggage:</strong> Cabin: 7kg • Check-in: 20kg</p>
              <p><strong>Fare Type:</strong> Economy</p>
            </div>
          </div>

          {/* Passenger Inputs */}
          <div className="bg-white rounded-xl shadow p-6 border">
            <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>
            {passengerDetails.map((_, idx) => (
              <div key={idx} className="mb-4 flex flex-col sm:flex-row gap-4">
                <input
                  className="border p-2 rounded w-full"
                  placeholder={`Passenger ${idx + 1} Name`}
                  onChange={(e) => handleInputChange(idx, "name", e.target.value)}
                />
                <input
                  className="border p-2 rounded w-full sm:w-1/3"
                  type="number"
                  placeholder="Age"
                  onChange={(e) => handleInputChange(idx, "age", e.target.value)}
                />
              </div>
            ))}
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded mt-4 float"
              onClick={handleConfirm}
            >
              Proceed To Payment
            </button>
          </div>
        </div>

        {/* Right: Fare Summary */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-xl p-6 border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fare Summary</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹ {Math.floor(flight.price )}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes and Surcharges</span>
                <span>₹ {Math.ceil(flight.price * 0.25)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-black">
                <span>Total Amount</span>
                <span>₹ {Math.floor(flight.price )+ Math.ceil(flight.price * 0.25)}</span>
              </div>
            </div>
            <div className="bg-green-50 text-green-800 text-sm mt-4 p-2 rounded border border-green-300">
              Prices for this itinerary may change. Confirm soon!
            </div>
          </div>

          {/* Coupons */}
          <div className="bg-yellow-50 shadow rounded-xl p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">Coupons and Offers</h3>
            <input
              className="w-full border p-2 rounded text-sm"
              placeholder="Enter coupon code"
            />
            <p className="text-sm text-blue-600 mt-2 hover:underline cursor-pointer">
              View all coupons
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
