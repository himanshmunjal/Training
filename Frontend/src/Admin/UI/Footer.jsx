import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 border-t border-gray-300 pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6">
        {/* Column 1 */}
        <div>
          <h4 className="text-lg font-bold">About Us</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">About SkyPorts</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Newsroom</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Corporate Information</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Tenders</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-bold">Book & Manage</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Search Flights</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Manage Booking</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Flight Schedule</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Cargo</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-bold">Where We Fly</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Route Map</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Non-stop Flights</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Popular Flights</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Partner Airlines</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-lg font-bold">Support</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">FAQs</li>
            <li className="hover:text-orange-500 transition-all duration-300 cursor-pointer">Grievance Resolution</li>
          </ul>
        </div>

        {/* Column 5 - App Download */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold">Air India App</h4>
          <p className="text-sm text-gray-600 mt-2">
            Download the app to manage flights.
          </p>
          <div className="flex gap-3 mt-4 justify-center md:justify-start">
            <img src="SkyPorts.png" alt="App Store" className="w-24" />
            <img
              src="/path-to-playstore.png"
              alt="Google Play"
              className="w-24"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
