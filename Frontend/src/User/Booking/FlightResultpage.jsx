// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // export default function FlightResultsPage() {
// //   const [flights, setFlights] = useState([]);
  
// //   useEffect(() => {
// //     const storedResults = localStorage.getItem("flightResults");
// //     if (storedResults) {
// //       setFlights(JSON.parse(storedResults));
// //     }
// //   }, []);
  
// //   return (
// //     <div className="p-6 max-w-6xl mx-auto">
// //       <h2 className="text-2xl font-semibold text-blue-700 mb-4">
// //         Search Results
// //       </h2>
// //       <FlightResults results={flights} />
// //     </div>
// //   );
// // }

// // function FlightResults({ results }) {
// //   const flightList = Array.isArray(results) ? results : [];
// //   const navigate = useNavigate();

// //   const bookTicket = async (flight) => {
// //     const confirm = window.confirm("Proceed to booking this flight?");
// //     if (!confirm) return;
// //     try {
// //       const res = await axios.post("http://localhost:2211/user/book", {
// //         flightId: flightId,
// //       });
// //       navigate("/user/confirmation");
// //     } catch (error) {
// //       console.error("Booking failed", error);
// //       alert("❌ Booking failed. Please try again.");
// //     }
  
// //     navigate("/user/confirmation", {
// //       state: {
// //         flight,
// //         passengers: 1 
// //       },
// //     });
// //   };
  
  
// //   return (
// //     <div className="flex flex-col mt-8">
// //       {flightList.length > 0 ? (
// //         flightList.map((flight, index) => (
// //           <div
// //             key={index}
// //             className="bg-white shadow-md rounded-lg p-4 border flex flex-row items-start justify-between"
// //           >
// //             <div className="flex-1 pr-4">
// //               <h2 className="text-lg font-semibold text-blue-700 mb-2">
// //                 {flight.airline} ✈ {flight.flightId}
// //               </h2>
// //               <p className="text-xl font-bold text-gray-600">
// //                 {flight.source} ➡ {flight.destination}
// //               </p>
// //               <p className="text-sm text-gray-500">
// //                 Depart: {flight.depart_date} at {flight.depart_time}
// //               </p>
// //               <p className="text-sm text-gray-500 mb-2">
// //                 Arrive: {flight.arrival_date} at {flight.arrival_time}
// //               </p>
// //               <p className="text-sm text-black font-bold">₹ {flight.price}</p>
// //             </div>

// //             <div className="flex-shrink-0">
// //               <button
// //                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
// //                 onClick={() => bookTicket(flight.flightId)}
// //               >
// //                 Book Now
// //               </button>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="text-center col-span-full text-gray-500">
// //           No flight results available.
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// // FlightResults.defaultProps = {
// //   results: [],
// // };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function FlightResultsPage() {
//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:2211/api/flights") // replace with your endpoint
//       .then((res) => setFlights(res.data))
//       .catch((err) => {
//         console.error("Error fetching flights", err);
//         alert("Unable to load flights.");
//       });
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-semibold text-blue-700 mb-4">
//         Search Results
//       </h2>
//       <FlightResults results={flights} />
//     </div>
//   );
// }

// function FlightResults({ results }) {
//   const navigate = useNavigate();
//   const flightList = Array.isArray(results) ? results : [];

//   const bookTicket = (flight) => {
//     const confirm = window.confirm("Proceed to booking this flight?");
//     if (!confirm) return;

//     navigate("/user/booking", {
//       state: {
//         flight,
//         passengers: 1, // You can update this dynamically if needed
//       },
//     });
//   };

//   return (
//     <div className="flex flex-col mt-8">
//       {flightList.length > 0 ? (
//         flightList.map((flight, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-lg p-4 border flex flex-row items-start justify-between mb-4"
//           >
//             <div className="flex-1 pr-4">
//               <h2 className="text-lg font-semibold text-blue-700 mb-2">
//                 {flight.airline} ✈ {flight.flightId}
//               </h2>
//               <p className="text-xl font-bold text-gray-600">
//                 {flight.source} ➡ {flight.destination}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Depart: {flight.depart_date} at {flight.depart_time}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Arrive: {flight.arrival_date} at {flight.arrival_time}
//               </p>
//               <p className="text-sm text-black font-bold">₹ {flight.price}</p>
//             </div>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => bookTicket(flight)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No flight results available.</p>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function FlightResultsPage() {
//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     axios
//       .post("http://localhost:2211/api/booking") // replace with your endpoint
//       .then((res) => setFlights(res.data))
//       .catch((err) => {
//         console.error("Error fetching flights", err);
//         alert("Unable to load flights.");
//       });
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-semibold text-blue-700 mb-4">
//         Search Results
//       </h2>
//       <FlightResults results={flights} />
//     </div>
//   );
// }

// function FlightResults({ results }) {
//   const navigate = useNavigate();
//   const flightList = Array.isArray(results) ? results : [];

//   const bookTicket = (flight) => {
//     const confirm = window.confirm("Proceed to booking this flight?");
//     if (!confirm) return;

//     navigate("/user/confirmation", {
//       state: {
//         flight,
//         passengers: 1, // You can update this dynamically if needed
//       },
//     });
//   };

//   return (
//     <div className="flex flex-col mt-8">
//       {flightList.length > 0 ? (
//         flightList.map((flight, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-lg p-4 border flex flex-row items-start justify-between mb-4"
//           >
//             <div className="flex-1 pr-4">
//               <h2 className="text-lg font-semibold text-blue-700 mb-2">
//                 {flight.airline} ✈ {flight.flightId}
//               </h2>
//               <p className="text-xl font-bold text-gray-600">
//                 {flight.source} ➡ {flight.destination}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Depart: {flight.depart_date} at {flight.depart_time}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Arrive: {flight.arrival_date} at {flight.arrival_time}
//               </p>
//               <p className="text-sm text-black font-bold">₹ {flight.price}</p>
//             </div>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => bookTicket(flight)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">No flight results available.</p>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlightResultsPage() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const results = localStorage.getItem("flightResults");
    if (results) setFlights(JSON.parse(results));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Search Results</h2>
      <FlightResults results={flights} />
    </div>
  );
}

function FlightResults({ results }) {
  const navigate = useNavigate();
  const flightList = Array.isArray(results) ? results : [];

  const bookTicket = (flight) => {
    const confirm = window.confirm("Proceed to booking this flight?");
    if (!confirm) return;

    const payload = JSON.parse(localStorage.getItem("searchPayload")) || {};
    const totalPassengers = payload.passengers?.adults + payload.passengers?.kids || 1;

    // Extract selected benefit
    const benefit = Object.entries(payload.benefits || {}).find(([_, v]) => v)?.[0] || "normal";

    navigate("/user/confirmation", {
      state: {
        flight,
        passengers: totalPassengers,
        benefitType: benefit,
      },
    });
  };

  return (
    <div className="flex flex-col mt-8">
      {flightList.length > 0 ? (
        flightList.map((flight, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border flex flex-row items-start justify-between mb-4"
          >
            <div className="flex-1 pr-4">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                {flight.airline} ✈ {flight.flightId}
              </h2>
              <p className="text-xl font-bold text-gray-600">
                {flight.source} ➡ {flight.destination}
              </p>
              <p className="text-sm text-gray-500">Depart: {flight.depart_date} at {flight.depart_time}</p>
              <p className="text-sm text-gray-500">Arrive: {flight.arrival_date} at {flight.arrival_time}</p>
              <p className="text-sm font-bold text-black">₹ {flight.price}</p>
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => bookTicket(flight)}
            >
              Book Now
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No flight results available.</p>
      )}
    </div>
  );
}
