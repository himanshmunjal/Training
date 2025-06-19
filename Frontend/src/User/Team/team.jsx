// TeamPage.jsx
import React, { useRef, useEffect, useState } from "react";
import pic1 from "../../assets/pp1.webp"

const teamData = [
  {
    id: "dev",
    name: "Mr. Dev Dixit",
    role: "Cheif Executive Officer(CEO)",
    photo: pic1,
    bio: "As the Chief Executive Officer of this premier airport management platform, I am committed to delivering innovative solutions that streamline operations and enhance the passenger experience across aviation facilities worldwide. Our comprehensive suite of digital tools empowers airport operators to optimize resource allocation, improve operational efficiency, and maintain the highest standards of safety and service excellence. Through strategic partnerships with industry leaders and continuous investment in cutting-edge technology, we provide airports of all sizes with the infrastructure and insights needed to thrive in today's dynamic aviation landscape. Our mission is to transform airport management through intelligent automation, data-driven decision making, and seamless integration capabilities that drive measurable results and sustainable growth for our valued clients.",
  },
  {
    id: "akshay",
    name: "Mr. Akshay Oberoi",
    role: "Chief Technology Officer (CTO)",
    photo: pic1,
    bio: "As Chief Technology Officer, I lead our organization's technological vision and innovation strategy, ensuring our airport management platform remains at the forefront of digital transformation in the aviation industry. My team develops robust, scalable solutions that integrate seamlessly with existing airport infrastructure while incorporating emerging technologies such as artificial intelligence, IoT sensors, and cloud computing. We prioritize cybersecurity, system reliability, and user experience in every product we deliver, enabling airports to harness the power of real-time data analytics and predictive modeling. Through continuous research and development, we create technology solutions that not only meet today's operational challenges but anticipate the evolving needs of tomorrow's aviation ecosystem.",
  },
  {
    id: "yash",
    name: "Mr. Yash Kaushik",
    role: "Chief Financial Officer (CFO)",
    photo: pic1,
    bio: "As Chief Financial Officer, I oversee the strategic financial management and growth initiatives that drive our airport management platform's success and sustainability. My responsibilities encompass comprehensive financial planning, risk assessment, and investment analysis to ensure optimal resource allocation while maintaining strong fiscal discipline. I work closely with airport clients to develop cost-effective solutions that deliver measurable return on investment and support their long-term operational objectives. Through prudent financial stewardship and strategic partnerships, we continue to expand our market presence while providing competitive pricing models that make advanced airport management technology accessible to facilities of all sizes and budgets.",
  },
  {
    id: "nina",
    name: "Nina Das",
    role: "Director",
    photo: pic1,
    bio: "As Director of Strategic Operations, I bridge the gap between our executive vision and operational execution, ensuring seamless delivery of our airport management solutions to clients worldwide. My role encompasses overseeing cross-functional teams, managing key client relationships, and driving continuous improvement initiatives that enhance our service quality and market competitiveness. I collaborate closely with airport stakeholders to understand their unique challenges and translate those insights into actionable business strategies. Through effective leadership and stakeholder engagement, I ensure our organization maintains its reputation for excellence while scaling our operations to meet the growing demands of the global aviation industry.",
  },
  {
    id: "mukesh",
    name: "Mr. Mukesh Singh",
    role: "Operations Manager",
    photo: pic1,
    bio: "As Operations Manager, I ensure the day-to-day excellence of our airport management platform through meticulous oversight of system performance, client support, and service delivery processes. My team maintains 24/7 monitoring of our technology infrastructure, providing rapid response to any operational issues while implementing proactive maintenance protocols. I coordinate closely with technical teams and client services to guarantee seamless user experiences and maximize system uptime across all airport facilities we serve. Through standardized procedures, quality assurance protocols, and continuous process optimization, I maintain the operational reliability and efficiency that our airport clients depend on for their critical daily operations.",
  },
];

export default function TeamPage() {
    const [selectedMember, setSelectedMember] = useState(null); // Currently selected member

  return (
    <div className="flex h-screen font-sans bg-gray-100 text-gray-800">
      
      {/* === Sidebar === */}
      <aside className="w-1/4 bg-white border-r p-4 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Team</h2>
        <ul className="space-y-2">
          {teamData.map((member) => (
            <li
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`cursor-pointer px-3 py-2 rounded ${
                selectedMember?.id === member.id
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {member.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* === Content Area === */}
      <main className="w-3/4 p-10 overflow-y-auto h-screen">
        {selectedMember ? (
          <div className="bg-white p-6 rounded shadow-md flex flex-col items-center text-center space-y-4">
          <img
            src={selectedMember.photo}
            alt={selectedMember.name}
            className="w-52 h-52 object-cover m-5 border border-orange-300"
          />
        
          <div>
            <h3 className="text-2xl font-bold text-orange-600">{selectedMember.name}</h3>
            <p className="uppercase text-sm text-gray-500 mb-2">{selectedMember.role}</p>
            <p className="text-gray-700 leading-relaxed text-sm">{selectedMember.bio}</p>
          </div>
        </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-20">
            Click on a team member to view their details.
          </div>
        )}
      </main>
    </div>
  );
}