import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import students from './students.js'; // Import the students data
import { Link } from "react-router-dom";

const StudentSkillCard = ({ student }) => {
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);
  const zoomedImageRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Entry animation
  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Image interactions - with improved hover handling
  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent card flip
    if (isMobile) {
      setIsImageZoomed(true);
    }
  };

  const handleImageHover = (e) => {
    e.stopPropagation(); // Prevent card flip
    if (!isMobile) {
      // Use a slight delay to prevent accidental triggers
      hoverTimeoutRef.current = setTimeout(() => {
        setIsImageZoomed(true);
      }, 100);
    }
  };

  const handleImageHoverExit = (e) => {
    e.stopPropagation(); // Prevent card events
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleZoomOverlayInteraction = (e) => {
    // Keep the overlay open when interacting with it
    e.stopPropagation();
    
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };
  
  const handleZoomOverlayExit = () => {
    // Only auto-close for non-mobile devices
    if (!isMobile) {
      // Set a short timeout to allow moving to the image itself
      closeTimeoutRef.current = setTimeout(() => {
        setIsImageZoomed(false);
      }, 100);
    }
  };

  const closeZoomOverlay = () => {
    setIsImageZoomed(false);
  };

  // Card flip handlers - must not trigger when interacting with image
  const handleCardClick = (e) => {
    // Don't flip if clicked on image
    if (isMobile && !imageContainerRef.current.contains(e.target)) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleCardHover = (e) => {
    // Don't flip if hovering over image
    if (!isMobile && !imageContainerRef.current.contains(e.target)) {
      setIsFlipped(true);
    }
  };
  
  const handleCardHoverExit = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative h-96 w-full mb-8 mx-2" // Spacing between cards
      style={{ perspective: '1500px' }}
      onClick={handleCardClick}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHoverExit}
    >
      <div 
        className="w-full h-full transition-all duration-500 relative"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image section - completely isolated from card flip behavior */}
          <div 
            ref={imageContainerRef}
            className="overflow-hidden bg-gray-200 dark:bg-gray-700 h-48 relative"
          >
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={handleImageClick}
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageHoverExit}
            />
          </div>

          {/* Content section */}
          <div className="p-6 bg-white dark:bg-gray-700 flex flex-col h-56">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {student.name}
              </h3>
              <span className="bg-indigo-600 dark:bg-indigo-800 text-white text-xs font-bold px-2 py-1 rounded">
                #{student.enrollmentNumber}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{student.program}</p>
            <div className="mt-auto">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-gray-600 text-indigo-800 dark:text-indigo-200 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back of card (review) with circular image */}
        <div 
          className="absolute w-full h-full bg-white dark:bg-gray-700 p-6 flex flex-col justify-center rounded-lg shadow-md"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Circular image added above name */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md mb-3">
              <img 
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {student.name}
            </h3>
          </div>
          
          <div className="flex justify-center mb-4">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-yellow-500">★</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic text-center">
            "{student.review}"
          </p>
          {isMobile && (
            <button 
              className="mt-6 bg-indigo-100 text-indigo-800 dark:bg-gray-600 dark:text-indigo-200 px-4 py-2 rounded-lg font-medium self-end"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              Back
            </button>
          )}
        </div>
      </div>

      {/* Image zoom overlay - with conditional behavior based on device */}
      {isImageZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeZoomOverlay}
          onMouseMove={!isMobile ? handleZoomOverlayInteraction : undefined}
          onMouseEnter={!isMobile ? handleZoomOverlayInteraction : undefined}
          onMouseLeave={!isMobile ? handleZoomOverlayExit : undefined}
        >
          <div 
            ref={zoomedImageRef}
            className="relative max-w-4xl max-h-screen p-4"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={!isMobile ? handleZoomOverlayInteraction : undefined}
            onMouseLeave={!isMobile ? handleZoomOverlayExit : undefined}
          >
            <img
              src={student.image}
              alt={student.name}
              className="max-w-full max-h-full object-contain"
              onMouseEnter={!isMobile ? handleZoomOverlayInteraction : undefined}
            />
            
            {/* Close button only for mobile devices */}
            {isMobile && (
              <button 
                className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                onClick={closeZoomOverlay}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
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
    <div className="mt-16 overflow-x-hidden">
      {/* Header with Image */}
      <header
        ref={headerRef}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 mb-4">
              Developer Community <span className="text-indigo-600">Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              Meet our talented student developers and explore their technical skills.
            </p>
          </div>
          <div
            ref={headerImageRef}
            className="w-64 h-64 rounded-lg overflow-hidden"
          >
            <img
              src="https://res.cloudinary.com/dltyctci9/image/upload/v1743436977/fame_ck3mru.svg"
              alt="Developer Community"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-6 pb-8" ref={searchRef}>
        <div className="flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-sm p-2 flex items-center transition-all duration-300 hover:shadow-md">
            <input
              type="text"
              placeholder="Search by name or enrollment number..."
              className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="ml-2 bg-indigo-600 dark:bg-indigo-800 text-white p-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors flex items-center justify-center">
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
        <h2 className="gallery-head text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
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
            <p className="text-xl text-gray-600 dark:text-gray-400">No students match your search criteria</p>
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
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
            Community <b className='text-indigo-600'>Skills</b> Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 dark:from-gray-700 to-purple-50 dark:to-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl dark:shadow-gray-950">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "CSS", "HTML5", "Tailwind", "Responsive Design"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-gray-600 text-indigo-800 dark:text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 dark:from-gray-700 to-purple-50 dark:to-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl dark:shadow-gray-950">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Python", "Django", "Express", "MongoDB", "SQL", "Java"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-gray-600 text-indigo-800 dark:text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 dark:from-gray-700 to-purple-50 dark:to-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl dark:shadow-gray-950">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Mobile Development</h3>
              <div className="flex flex-wrap gap-2">
                {["React Native", "Kotlin", "Flutter", "Android", "Firebase", "App Design", "UX/UI"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-gray-600 text-indigo-800 dark:text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 dark:from-gray-700 to-purple-50 dark:to-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl dark:shadow-gray-950">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Data Science & AI</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "TensorFlow", "Data Analysis", "Machine Learning", "Pandas", "NumPy", "NLP"].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-gray-600 text-indigo-800 dark:text-indigo-300"
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
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 dark:from-indigo-800 to-purple-700 dark:to-purple-950 text-white">
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
    </div>
  );
};

export default DevCommunityGallery;