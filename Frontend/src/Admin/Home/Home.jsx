import {Link} from 'react-router-dom';

export default function Home(){
  const Card = (icon, title, link) => (
    <Link to={link} key={title} className="w-64 m-4">
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  );
  
  return (
    <>
      <div className="italic font-serif text-center">
        <h1 className="text-orange-500 text-2xl p-2">
          Fly Easy. Manage Flights. Track Everything.
        </h1>
        <h1 className="text-orange-500 text-xs p-2">
          Welcome to the Airport Management Portal. Check flights, book tickets, manage airport operations.
        </h1>
      </div>
  
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl w-full justify-items-center">
          {Card("✈️", "Flight Status", "/admin/flight-status")}
          {Card("📅", "Schedule Management", "/admin/flight-Manage")}
          {Card("📊", "Advisory", "/admin/advisory")}
          {Card("ℹ️", "Feedback View", "/admin/feedback")}
          {Card("👥", "Employee Details", "/admin/employee")}
          {Card("🔧", "Passanger Info", "/admin/passenger-info")}
  
          {/* Last card in its own centered row */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center">
            {Card("ℹ️", "Flight Info", "/admin/flight-info")}
          </div>
        </div>
      </div>
    </>
  );  
}