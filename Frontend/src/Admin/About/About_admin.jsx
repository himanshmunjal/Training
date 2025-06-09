function About() {
    const url =
      "https://imgak.mmtcdn.com/seo/cms-staticpages/sites/all/themes/custom/makemytrip/images/aboutus/topimg.jpg";
    return (
      <>
        <img src={url} alt="Hero" className="w-screen max-h-screen" />
        <div className="bg-gray-50 min-h-screen px-6 py-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-light mb-6">
              We are{" "}
              <span className="font-bold text-orange-500 cursor-pointer">
                SkyPorts
              </span>
            </h2>
  
            {/* Grid Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg leading-relaxed">
              {/* Left Column */}
              <div>
                <p className="mb-6">
                  Your One-Stop Solution for Airport & Flight Data Born from the
                  vision of providing travelers with seamless airport management
                  and real-time flight data, our Airport Management System ensures
                  efficiency, reliability, and convenience for passengers,
                  airlines, and airport authorities. Since inception, we have
                  focused on delivering accurate flight tracking, smooth passenger
                  movement, and operational excellence—powered by cutting-edge
                  technology and real-time updates. With aviation evolving
                  rapidly, our platform bridges the gap between travelers and
                  airport operations. From flight scheduling to baggage tracking,
                  our solution ensures hassle-free experiences, integrating
                  security, check-ins, boarding management, and airport
                  infrastructure monitoring in one place.
                </p>
                <p className="mb-6">
                  After successfully consolidating its position as a
                  customer-first brand, known for its reliability and
                  transparency, SkyPorts launched its India operations in 2025.
                </p>
              </div>
  
              {/* Right Column */}
              <div>
                <p className="mb-6">
                  In collaboration with leading aviation and travel technology
                  partners, we continuously refine our system to meet global
                  standards and enhance airport efficiency.
                </p>
                <p className="mb-6">
                  ✈ Flight Management – Real-time flight tracking, scheduling, and
                  status updates. 🛄 Passenger Services – Seamless booking,
                  check-in, and security processing. 📦 Baggage Handling – Smart
                  baggage tracking for easy retrieval. 🔍 Airport Infrastructure –
                  Gate management, runway allocation, and security integration.
                </p>
                <p>
                  Our system is designed to optimize airport operations, minimize
                  delays, and improve passenger experience—making air travel
                  simpler, faster, and more reliable.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl pb-4">
              Why Choose Skyports for{" "}
              <span className="font-bold text-orange-500">Flight Booking?</span>
            </h2>
            <p >
              SkyPorts is a trusted travel booking platform known for its
              transparent pricing, reliable customer support, and seamless booking
              experience. Here’s why millions of travellers choose Cleartrip for
              booking flights:
            </p>
            <ul className="list-disc ml-4 pt-4">
              <li><span className="text-gray-500 font-medium">Best Deals & Transparent Pricing</span> - No hidden charges, just competitive fares to save money.</li>
              <li><span className="text-gray-500 font-medium">Flexible Booking & Cancellations</span> - Modify or cancel your booking with ease.</li>
              <li><span className="text-gray-500 font-medium">Wide Airline Options</span> - Compare flight ticket pricing from multiple carriers in one place.</li>
              <li><span className="text-gray-500 font-medium">Seamless Booking Process</span> - Quick search, secure payment, and instant confirmation.</li>
              <li><span className="text-gray-500 font-medium">24/7 Customer Support</span> - Assistance anytime, anywhere for a smooth journey.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl pb-4 pt-4">
            Enjoy a Hassle-Free Travel Experience
            </h2>
            <p >
            At SkyPorts, we go beyond just flight bookings. Our platform helps travellers with:
            </p>
            <ul className="list-disc ml-4 pt-4 pb-4">
              <li>Real-time flight status tracking</li>
              <li>Secure payment and data protection</li>
              <li>Comprehensive travel insurance options</li>
              <li>Baggage allowance details and add-ons</li>
              <li>Special assistance services for senior citizens and infants</li>
            </ul>
            <p>From budget flights to luxury travel, Cleartrip ensures a smooth, stress-free booking process, helping you save both time and money.</p>
          </div>
        </div>
      </>
    );
  }
  
  export default About;