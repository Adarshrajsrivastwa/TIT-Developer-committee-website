import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import students from './students.js'; // Import the students data
import { Link } from "react-router-dom";

const StudentSkillCard = ({ student }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Removed fixed height, letting content determine size */}
      <div className="overflow-hidden bg-gray-200 relative">
        <img
          src={student.image}
          alt={student.name}
          className="w-full object-contain"
        // Using object-contain instead of object-cover to preserve aspect ratio
        // Removed fixed height to allow image to dictate container size
        />
      </div>
      <div className="p-6 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
          <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
            #{student.enrollmentNumber}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{student.program}</p>
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DevCommunityGallery = () => {
  const searchRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const headerImageRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -700,
      opacity: 0,
      duration: 2.5,
      ease: "bounce.out"
    });

    // Header image animation
    gsap.from(headerImageRef.current, {
      x: 30,
      opacity: 0,
      duration: 1.2,
      delay: 1.7,
      ease: "power3.out"
    });

    // Stagger animation for gallery items
    gsap.from(".student-card", {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      delay: 2.5,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top bottom-=100",
      }
    });

    gsap.from(".gallery-head", {
      opacity: 0,
      x: -500,
      duration: 1,
      delay: 2.5
    });

    gsap.from(searchRef.current, {
      opacity: 0,
      x: 500,
      duration: 1,
      delay: 2.5
    })
  }, []);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTermLower) ||
      String(student.enrollmentNumber).toLowerCase().includes(searchTermLower)
    );

    setFilteredStudents(filtered);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16 overflow-x-hidden">
      {/* Header with Image */}
      <header
        ref={headerRef}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Developer Community <span className="text-indigo-600">Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Meet our talented student developers and explore their technical skills.
            </p>
          </div>
          <div
            ref={headerImageRef}
            className="w-64 h-64 rounded-lg overflow-hidden"
          >
            <img
              src="/assets/img/testimonial-img/testimonial.svg"
              alt="Developer Community"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-6 pb-8" ref={searchRef}>
        <div className="flex justify-end">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-2 flex items-center transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              placeholder="Search by name or enrollment number..."
              className="w-full px-4 py-2 text-gray-700 bg-transparent border-none focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="ml-2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Student Gallery */}
      <section
        className="py-8 px-6 max-w-6xl mx-auto"
      >
        <h2 className="gallery-head text-3xl font-bold text-center text-gray-800 mb-12">
          Student Developers & Their Skills
        </h2>
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudents.map((student) => (
              <div key={student.id} className="student-card">
                <StudentSkillCard student={student} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No students match your search criteria</p>
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Skills Distribution */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Community Skills Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "CSS", "HTML5", "Tailwind", "Responsive Design"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Python", "Django", "Express", "MongoDB", "SQL", "Java"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mobile Development</h3>
              <div className="flex flex-wrap gap-2">
                {["React Native", "Kotlin", "Flutter", "Android", "Firebase", "App Design", "UX/UI"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Data Science & AI</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "TensorFlow", "Data Analysis", "Machine Learning", "Pandas", "NumPy", "NLP"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Developer Community</h2>
          <p className="text-xl mb-8">
            Learn alongside talented peers and develop the skills that will launch your career.
          </p>
          <Link to="/join-us">
            <button className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-6 text-center">
        <p>© {new Date().getFullYear()} College Developer Community. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DevCommunityGallery;