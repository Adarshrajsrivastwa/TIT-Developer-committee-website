import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  CodeIcon,
  TrophyIcon,
  UsersIcon,
  CalendarIcon,
  FilterIcon,
  FileTextIcon
} from 'lucide-react';

const JoinPathways = [
  {
    id: 1,
    title: "Coding Quest",
    type: "Competition",
    description: "Annual technical competition testing coding skills and problem-solving abilities",
    participants: 200,
    rounds: [
      "MCQ-based Evaluation via TIT App",
      "Coding Challenge on Unstop Platform"
    ],
    rewards: [
      "₹1000 for Category Toppers",
      "Trophies for Top 3 Performers"
    ],
    icon: <CodeIcon className="text-green-500" />,
    formLink: "https://forms.gle/HtDsmipULHYzFbL4A"
  },
  {
    id: 2,
    title: "Hackathon & Recruitment",
    type: "Recruitment",
    description: "Annual event where exceptional performers get direct entry into TIT Developer Community",
    participants: 60,
    rounds: [
      "Technical Project Showcase",
      "Performance-Based Selection"
    ],
    rewards: [
      "Direct Community Membership",
      "Mentorship Opportunities"
    ],
    icon: <TrophyIcon className="text-blue-500" />,
    formLink: "https://forms.gle/HtDsmipULHYzFbL4A"
  }
];

const HowToJoin = () => {
  const [filteredPathways, setFilteredPathways] = useState(JoinPathways);
  const [activeFilter, setActiveFilter] = useState("All");
  const pathwaysContainerRef = useRef(null);

  const filterCategories = ["All", "Competition", "Recruitment"];

  useEffect(() => {
    // GSAP Animations for pathways
    if (pathwaysContainerRef.current) {
      gsap.fromTo(
        pathwaysContainerRef.current.children,
        { opacity: 0, y: 50, scale: 0 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.3, duration: 0.2, ease: "power3.out" }
      );
    }
  }, [filteredPathways]);

  const handleFilter = (category) => {
    setActiveFilter(category);

    if (category === "All") {
      setFilteredPathways(JoinPathways);
    } else {
      const filtered = JoinPathways.filter(pathway => pathway.type === category);
      setFilteredPathways(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 mt-10">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Join <span className="text-indigo-600">TIT Developer Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Transforming aspiring tech enthusiasts into industry-ready professionals through competitive selection and mentorship.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://res.cloudinary.com/dltyctci9/image/upload/v1743437158/join-us_uxcsgn.svg"
              alt="Join Community"
              className="w-full max-w-md md:max-w-lg rounded-lg"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                ${activeFilter === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100"}`}
            >
              <FilterIcon size={16} className="mr-2" />
              {category}
            </button>
          ))}
        </div>

        {/* Pathways Grid */}
        <div ref={pathwaysContainerRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPathways.map((pathway) => (
            <div
              key={pathway.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-100 p-3 rounded-full">
                  {pathway.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{pathway.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon size={14} className="mr-2" />
                    Annual Event
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{pathway.description}</p>

              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Selection Process</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {pathway.rounds.map((round, index) => (
                    <li key={index} className="flex items-center">
                      <UsersIcon size={12} className="mr-2 text-indigo-500" />
                      {round}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Rewards & Benefits</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {pathway.rewards.map((reward, index) => (
                    <li key={index} className="flex items-center">
                      <TrophyIcon size={12} className="mr-2 text-yellow-500" />
                      {reward}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs">
                  {pathway.type}
                </span>
                <span className="text-gray-500 text-sm">
                  {pathway.participants} Potential Participants
                </span>
              </div>

              {/* Added Fill Form Button */}
              <a
                href={pathway.formLink}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <FileTextIcon size={16} className="mr-2" />
                Fill Application Form
              </a>
            </div>
          ))}
        </div>

        {filteredPathways.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No pathways found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default HowToJoin;