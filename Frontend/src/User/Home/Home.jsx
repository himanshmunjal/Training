import { Link } from "react-router-dom";

export default function Home() {
  const Card = (icon, title, link) => [
    <Link to={link} key={title} className="w-96 m-4">
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>,
  ];
  return (
    <>
      <div className="italic font-serif mb-4">
        <h1 className="text-orange-500 text-2xl p-2">
          Fly Easy. Manage Flights. Track Everything.
        </h1>
        <h1 className="text-orange-500 text-xs p-2">
          Welcome to the Airport Management Portal. Check flights, book tickets,
          manage airport operations.
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 align-middle">
        {Card("✈️", "Flight Status", "/user/flight-status")}
        {Card("📅", "Flight Booking", "/user/flight-bookings")}
        {Card("🧳", "Baggage Tracker", "/user/baggage-tracker")}
        {Card("ℹ️", "Complaint Registration", "/user/support")}
        {Card("👤", "User Profile", "/user/profile")}
        {Card("🔧", "Holiday Packages", "/admin")}
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold m-4">Explore More</h2>
        <div className="flex justify-center">

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-7 ">
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110 flex items-center justify-center m-4"
            style={{
              backgroundImage:
              "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/91/04/91/goldfinch-hotel-delhi.jpg?w=1200&h=-1&s=1')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">Hotels Coming Soon</h2>
            </div>
          </div>
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110 flex items-center justify-center m-4"
            style={{
              backgroundImage:
              "url('https://avionprive.in/wp-content/uploads/2021/03/avion1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">Charter Booking loading...</h2>
            </div>
          </div>
          <div
            className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg transition-all hover:brightness-110 flex items-center justify-center m-4"
            style={{
              backgroundImage:
              "url('https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/12/Emirates-Airlines-Dubai.jpg?resize=1200%2C960&ssl=1')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">International Partners</h2>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}