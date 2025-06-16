import {Link} from 'react-router-dom';

export default function Home(){
  const Card =(icon,title,link)=> [
    <Link to={link} key={title} className="w-64 m-4">
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  ];
    return(
      <>
        <div className='italic font-serif'>
          <h1 className='text-orange-500 text-2xl p-2'>Fly Easy. Manage Flights. Track Everything.</h1>
          <h1 className='text-orange-500 text-xs p-2'>Welcome to the Airport Management Portal. Check flights, book tickets, manage airport operations.</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 mb-6 mt-6'>
          {Card('✈️', 'Flight Info', '/admin/flight-info')}
          {Card('📅', 'Schedule Management', '/schedules')}
          {Card('📊', 'Advisory', '/admin/advisory')}
          {Card('🛬', 'Arrival/Departure', '/admin/arrivals-departures')}
          {Card('👥', 'Employee Details', '/admin/employee')}
          {Card('🔧', 'Passanger Info', '/admin/passanger-info')}
        </div>
      </>
    );
}