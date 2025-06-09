import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    from: "",
    destination: "",
    depart: "",
    back: "",
    passengers: {
      adults: 1,
      kids: 0, // Changed from "children"
      babies: 0, // Changed from "infants"
    },
    benefits: {
      student: false,
      armedForces: false,
      doctorNurse: false,
      seniorCitizen: false,
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      passengers: { ...formData.passengers, [name]: parseInt(value) },
    });
  };

  const handleBenefitChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      benefits: { ...formData.benefits, [name]: checked },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Info:", formData);
  };

  return (
    <>
      <div className="bg-white shadow-2xl rounded-xl p-6 max-w-5xl mx-auto mt-10 p-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">From</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="Country or airport"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">To</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Country or airport"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">Depart</label>
              <input
                type="date"
                name="depart"
                value={formData.depart}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm text-gray-600">Return</label>
              <input
                type="date"
                name="back"
                value={formData.back}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="">
              <label className="text-sm text-gray-600">Passengers</label>
              <div className="grid grid-cols-1 gap-2">
                <input
                  type="number"
                  name="adults"
                  value={formData.passengers.adults}
                  onChange={handlePassengerChange}
                  min="1"
                  className="w-full border rounded px-2 py-1"
                  placeholder="Adults (12+ years)"
                />
                <label className="text-sm text-gray-600">Children</label>
                <input
                  type="number"
                  name="kids"
                  value={formData.passengers.kids}
                  onChange={handlePassengerChange}
                  min="0"
                  className="w-full border rounded px-2 py-1"
                  placeholder="Kids (2-12 years)"
                />
                <label className="text-sm text-gray-600">Infants</label>
                <input
                  type="number"
                  name="babies"
                  value={formData.passengers.babies}
                  onChange={handlePassengerChange}
                  min="0"
                  className="w-full border rounded px-2 py-1"
                  placeholder="Babies (Below 2 years)"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium mb-2 text-gray-600">
              Additional Benefits
            </p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="student"
                  checked={formData.benefits.student}
                  onChange={handleBenefitChange}
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="armedForces"
                  checked={formData.benefits.armedForces}
                  onChange={handleBenefitChange}
                />
                Armed Forces
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="doctorNurse"
                  checked={formData.benefits.doctorNurse}
                  onChange={handleBenefitChange}
                />
                Doctor/Nurse
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="seniorCitizen"
                  checked={formData.benefits.seniorCitizen}
                  onChange={handleBenefitChange}
                />
                Senior Citizen
              </label>
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-4">
        <div className="cursor-pointer max-w-xs min-h-min mb-5 ml-5 ounded overflow-hidden shadow-lg bg-white p-6">
          <img
            className="w-full"
            src="https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=1024x1024&w=is&k=20&c=pNrrSjEUXD5z0YPxWi16_3j2QWDtJnoFl0-w2128Gws="
            alt="Travel"
          />
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-blue-600">AXISCC</h2>
              <div className="bg-green-500 text-white rounded px-2 py-1 text-xs font-bold">
                TRAVEL Max SALE
              </div>
            </div>
            <p className="text-gray-700 text-base mt-2">
              Flat 12% off on Domestic Flights with Credit Cards & EMI
              transactions
            </p>
          </div>
        </div>
        <div className="cursor-pointer max-w-xs min-h-min mb-5 ml-5 ounded overflow-hidden shadow-lg bg-white p-6">
          <img
            className="w-full"
            src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/5V62QS6ZHNF6DBA7656F3RS4UY.jpg"
            alt="Travel"
          />
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-blue-600">PNBCC</h2>
              <div className="bg-green-500 text-white rounded px-2 py-1 text-xs font-bold">
                TRAVEL Max SALE
              </div>
            </div>
            <p className="text-gray-700 text-base mt-2">
              Upto 12% off on Punjab National Bank Credit Cards & EMI
              transactions
            </p>
          </div>
        </div>
        <div className="cursor-pointer max-w-xs min-h-min mb-5 ml-5 ounded overflow-hidden shadow-lg bg-white p-6">
          <img
            className="w-full"
            src="https://airindia.scene7.com/is/image/airindia/AirIndiaExpress?fmt=png-alpha&bfc=on"
            alt="Travel"
          />
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-blue-600">AIXBC</h2>
              <div className="bg-green-500 text-white rounded px-2 py-1 text-xs font-bold">
                TRAVEL Max SALE
              </div>
            </div>
            <p className="text-gray-700 text-base mt-2">
              Flat 20% off on all business class bookings of Air India Express.
            </p>
          </div>
        </div>
        <div className="cursor-pointer max-w-xs min-h-min mb-5 ml-5 ounded overflow-hidden shadow-lg bg-white p-6">
          <img
            className="w-full"
            src="https://img.static-af.com/transform/e56219e9-21c7-4bb0-b7a5-f5353a5140d3/"
            alt="Travel"
          />
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-blue-600"></h2>
              <div className="bg-green-500 text-white rounded px-2 py-1 text-xs font-bold">
                Special FARE SALE live
              </div>
            </div>
            <p className="text-gray-700 text-base mt-2">
              Flights Starting 1,199
            </p>
            <p className="text-gray-700 text-base mt-2">
              Internatinal flights from 4,599
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold m-4">Popular Destinations</h2>
        <div className="grid grid-cols-5 gap-4 m-4 justify-center items-center ">
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110"
            style={{
              backgroundImage:
                "url('https://www.onthegotours.com/repository/Sandy-beach-in-Goa--India-Tours--On-The-Go-Tours-346991495533921.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">Goa</h2>
          </div>
          </div>
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110"
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F7xZ48abwAAgNst.jpg/960px-F7xZ48abwAAgNst.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">Mumbai</h2>
          </div>
          </div>
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOqBARyjNC-OC59RgHMq2TlAenTQDqHNYLQ&s')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">Dubai</h2>
          </div>
          </div>
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-XbhQiZlfuMBMkQBMuk1S97upllr-jjMAzA&s')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">London</h2>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
//   {/* <div
//   className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg"
//   style={{
//     backgroundImage: "url('https://your-image-url.com/goa.jpg')", // Replace with actual URL or import
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}
// >
//   {/* Overlay */}
//   <div className="absolute inset-0 bg-black bg-opacity-40"></div>

//   {/* Text on Image */}
//   <div className="absolute bottom-4 left-4 text-white">
//     <h2 className="text-xl font-bold">Goa</h2>
//     <p className="text-sm">3051 Properties</p>
//   </div> */}
