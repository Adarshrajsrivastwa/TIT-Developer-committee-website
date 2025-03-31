import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  CodeIcon,
  LaptopIcon,
  DatabaseIcon,
  ShieldIcon,
  FilterIcon,
  CalendarIcon
} from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Android Development Workshop",
    date: "2024-03-15",
    type: "Workshop",
    description: "Comprehensive workshop on modern Android app development techniques",
    participants: 45,
    icon: <CodeIcon className="text-green-500" />,
  },
  {
    id: 2,
    title: "Web Development Hackathon",
    date: "2024-04-20",
    type: "Hackathon",
    description: "24-hour intensive hackathon focusing on full-stack web technologies",
    participants: 60,
    icon: <LaptopIcon className="text-blue-500" />,
  },
  {
    id: 3,
    title: "Machine Learning Masterclass",
    date: "2024-05-10",
    type: "Masterclass",
    description: "Advanced ML techniques and practical implementation strategies",
    participants: 35,
    icon: <DatabaseIcon className="text-purple-500" />,
  },
  {
    id: 4,
    title: "Cybersecurity Bootcamp",
    date: "2024-06-05",
    type: "Bootcamp",
    description: "Comprehensive training on ethical hacking and network security",
    participants: 40,
    icon: <ShieldIcon className="text-red-500" />,
  }
];

const EventsList = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeFilter, setActiveFilter] = useState("All");
  const eventsContainerRef = useRef(null);

  const filterCategories = ["All", "Hackathon", "Workshop", "Bootcamp", "Masterclass"];

  useEffect(() => {
    // GSAP Animations for events
    if (eventsContainerRef.current) {
      gsap.fromTo(
        eventsContainerRef.current.children,
        { opacity: 0, y: 50, scale: 0 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.3, duration: 0.2, ease: "power3.out" }
      );
    }
  }, [filteredEvents]);

  const handleFilter = (category) => {
    setActiveFilter(category);

    if (category === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.type === category);
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 mt-10">

          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 md:mb-6">
              Our <span className="text-indigo-600">Upcoming Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-7 md:mb-0">
              Empowering tech enthusiasts through immersive learning experiences and cutting-edge workshops.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://res.cloudinary.com/dltyctci9/image/upload/v1743436455/event_zuglf9.svg"
              alt="Upcoming Events"
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

        {/* Events Grid */}
        <div ref={eventsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-100 p-3 rounded-full">
                  {event.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon size={14} className="mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs">
                  {event.type}
                </span>
                <span className="text-gray-500 text-sm">
                  {event.participants} Participants
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No events found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
