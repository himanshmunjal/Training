import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom"; // ✅ Fix: Import Link for routing

function Home() {
  const travelFacts = [
    "France is the most visited country in the world with 89.4M tourists.",
    "Lower air pressure in plane cabins reduces taste sensitivity to sweet and salty foods by ~30%.",
    "Ethiopia follows a different calendar, making it still 2015 there.",
    "In Bulgaria, shaking your head means 'yes' and nodding means 'no'.",
    "The shortest scheduled passenger flight is in Scotland, lasting ~1.5 minutes.",
    "The longest town name is 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch' in Wales.",
    "Monaco is smaller than Central Park in New York, yet 1 in 3 residents are millionaires.",
    "The island of Yap uses rocks as currency.",
    "Travelers gain an average of 0.6 pounds (~0.3 kg) on a 1–3 week trip.",
    "40% of Generation Y picks travel destinations based on Instagrammable photos.",
    "Italy has a free, 24/7 wine fountain in Ortona, Abruzzo.",
    "Canada holds 62% of the world's 1.42M lakes.",
    "Jet lag is worse after traveling east due to difficulties adjusting the body clock.",
    "Papua New Guinea has nearly 820 languages, making it the most linguistically diverse country.",
    "France spans more time zones than any other country (12).",
    "Indonesia consists of over 17.5K islands.",
    "Libya is 99% desert.",
    "Tuvalu is the least visited country in the world.",
    "27% of the Netherlands is below sea level.",
    "Australia is the only country that occupies an entire continent.",
    "Norway and Sweden have the most islands globally.",
    "Greenland is the largest island in the world.",
    "Canada has the longest coastline, bordering three oceans.",
    "Mongolia has the lowest population density (~4.4 people per square mile).",
    "There are ~6.5K languages in the world, but 97% of people speak just 4% of them.",
    "Rome’s Trevi Fountain collects coins daily and donates them to charity.",
    "China follows a single time zone despite spanning five geographical zones.",
    "Methuselah, a 4,853-year-old tree, grows in California’s White Mountains.",
    "Australia has over 10K beaches—it would take 27 years to visit a new one daily.",
    "Pittsburgh has 446 bridges, more than Venice.",
    "Iceland has no mosquitoes.",
    "The Louvre is the most visited museum in the world.",
    "The world’s longest road is the Pan-American Highway at 30K miles (48.2K km).",
    "The world’s shortest flight lasts ~53 seconds in Scotland.",
    "Guangzhou Baiyun International Airport is the busiest airport globally.",
    "The longest nonstop commercial flight is Los Angeles to Singapore (~17 hours 50 minutes).",
    "Qatar Airlines’ Auckland to Doha route covers the longest distance (~9,032 miles).",
    "Japan has the most expensive airport taxis (~$165 in Hiroshima and Oita).",
    "Pilots and co-pilots are advised not to eat the same food in case of contamination.",
  ];

  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  return (
    <>
      <nav
        className={`sticky z-50 top-0 w-full flex items-center justify-between p-4 shadow-md backdrop-blur-lg border ${
          darkMode
            ? "bg-gray-900/80 text-white border-gray-700"
            : "bg-white/80 text-black border-gray-300"
        }`}
      >
        {/* Left Side: Title */}
        <h2 className="text-2xl font-bold ml-4 text-orange-500">
          <Link to="/">🛫🛬 SkyPort</Link>
        </h2>
        <label className="relative flex items-center cursor-pointer">
          <span className="text-sm mr-3">🌞</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="hidden"
          />
          <div className="w-14 h-7 bg-gray-400 rounded-full shadow-inner relative transition-all duration-300">
            <div
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                darkMode ? "translate-x-7" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm ml-3">🌙</span>
        </label>
      </nav>
      {/* Container for Centering the Cards */}
      <div className="flex justify-center items-center m-5 p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Login Card */}
          <Link to="/user/login-user">
            <div className="cursor-pointer w-64 h-80 flex flex-col items-center justify-center text-center rounded-lg overflow-hidden shadow-lg bg-white p-6 transition-transform hover:scale-105">
              <img
                className="w-40 mb-4"
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                alt="User Login"
              />
              <button className="bg-orange-500 text-white rounded px-4 py-2 font-bold flex items-center gap-2">
                User Login ➡️
              </button>
            </div>
          </Link>

          {/* Admin Login Card */}
          <Link to="/admin/login-admin">
            <div className="cursor-pointer w-64 h-80 flex flex-col items-center justify-center text-center rounded-lg overflow-hidden shadow-lg bg-white p-6 transition-transform hover:scale-105">
              <img
                className="w-40 mb-4"
                src="https://i.pinimg.com/736x/6a/44/f0/6a44f0e35b10e6ed063eeebf7ed844f9.jpg"
                alt="Admin Login"
              />
              <button className="bg-orange-500 text-white rounded px-4 py-2 font-bold flex items-center gap-2">
                Admin Login ➡️
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Spotlight Effect */}
      <div className="m-10">
        <div className="flex flex-col rounded-lg overflow-hidden shadow-lg">
          <h2 className="text-xl pt-6 pl-6 pr-6">Spotlight</h2>
          <ul className="ml-6 list-disc mb-6">
            <li className="p-2 underline underline-offset-4">
              Seamless Flight Operations, Effortless Travel.
            </li>
            <li className="p-2 underline underline-offset-8">
              Your One-Stop Hub for Airport Efficiency!
            </li>
            <li className="p-2 underline underline-offset-8">
              Tracking Every Flight, Connecting Every Journey.
            </li>
            <li className="p-2 underline underline-offset-8">
              Smart Airports Start Here – Security, Scheduling & More!
            </li>
            <li className="p-2 underline underline-offset-8">
              Turning Chaos into Coordination, One Flight at a Time.
            </li>
          </ul>
        </div>
      </div>

      {/* Fun Fact About Travel */}
      <div className="mt-2 text-center text-gray-700 text-lg">
        ✈️ <span className="font-bold">Fun Fact:</span>{" "}
        {travelFacts[Math.floor(Math.random() * travelFacts.length)]}.
      </div>
      <div className="mt-8 text-center bg-orange-500 h-12 flex items-center justify-center text-white font-bold">
        <p className="text-center text-gray-900 mt-4">
          © 2025 SkyPort. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Home;
