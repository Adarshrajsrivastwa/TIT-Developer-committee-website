import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { gsap } from "gsap";
import { ThemeContext } from "../utils/ThemeContext"; // Import ThemeContext

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext
    const location = useLocation();
    const currentPath = location.pathname;

    const logoRef = useRef(null);
    const joinButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const toggleRef = useRef(null);
    const linkRefs = useRef([]);
    const initialLoadComplete = useRef(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Mentors", path: "/mentors" },
        { name: "Events", path: "/events" },
        { name: "Hall of Fame", path: "/hall-of-fame" },
        { name: "Reviews", path: "/testimonials" },
    ];

    // Function to determine if a link is active
    const isLinkActive = (linkPath) => {
        if (linkPath === "/") {
            return currentPath === "/";
        } else {
            return currentPath === linkPath ||
                (currentPath.startsWith(linkPath + "/") && linkPath !== "/");
        }
    };

    // Initial load animations - only run once
    useEffect(() => {
        if (initialLoadComplete.current) return;

        // Clear previous refs to prevent stale references
        linkRefs.current = linkRefs.current.slice(0, navLinks.length);

        // Initial animation timeline
        const tl = gsap.timeline();

        // 1. Logo animation
        if (logoRef.current) {
            tl.fromTo(
                logoRef.current,
                { opacity: 0, y: -100 },
                { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out" }
            );
        }

        // 2. Navigation links
        if (linkRefs.current.length > 0 && linkRefs.current[0]) {
            tl.fromTo(
                linkRefs.current,
                { opacity: 0, y: -30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                },
                "-=0.2"
            );
        }

        // 3. Join Us button and toggle
        if (joinButtonRef.current && toggleRef.current) {
            tl.fromTo(
                [joinButtonRef.current, toggleRef.current],
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.3"
            );
        }

        initialLoadComplete.current = true;
    }, []); // Empty dependency array ensures this only runs once

    // Mobile menu animations
    useEffect(() => {
        // Mobile Menu Animation
        if (mobileMenuRef.current && isOpen) {
            gsap.fromTo(
                mobileMenuRef.current.children,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    // Route change updates
    useEffect(() => {
        // Update active link styles when route changes
        linkRefs.current.forEach((link, index) => {
            if (link && index < navLinks.length) {
                const linkPath = navLinks[index].path;
                const active = isLinkActive(linkPath);

                // Clean up previous animations
                const existingUnderline = link.querySelector(".nav-underline");
                if (existingUnderline) {
                    existingUnderline.remove();
                }

                // Create underline element
                const underline = document.createElement("span");
                underline.classList.add("nav-underline", "absolute", "bottom-0", "left-0", "h-[2px]",
                    darkMode ? "bg-indigo-400" : "bg-indigo-600",
                    "transition-all", "duration-300");
                link.appendChild(underline);

                // Set initial state
                gsap.set(link, { position: "relative", overflow: "hidden" });

                if (active) {
                    gsap.set(underline, { width: "100%" });
                    gsap.set(link, {
                        fontWeight: "bold",
                        color: darkMode ? "#818cf8" : "#4f46e5"
                    });
                } else {
                    gsap.set(underline, { width: "0%" });
                    gsap.set(link, {
                        fontWeight: "normal",
                        color: darkMode ? "#f3f4f6" : "#1f2937"
                    });

                    // Add hover effects only to non-active links
                    link.addEventListener("mouseenter", () => {
                        gsap.to(underline, { width: "100%", duration: 0.1 });
                        gsap.to(link, { scale: 1.05, duration: 0.2 });
                    });

                    link.addEventListener("mouseleave", () => {
                        gsap.to(underline, { width: "0%", duration: 0.1 });
                        gsap.to(link, { scale: 1, duration: 0.2 });
                    });
                }
            }
        });
    }, [currentPath, darkMode]); // Added darkMode as dependency to update when mode changes

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md ${darkMode ? 'bg-gray-900/90 text-white' : 'bg-gray-100/5'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
                {/* Desktop Logo - Hidden on mobile */}
                <Link
                    ref={logoRef}
                    to="/"
                    className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} flex items-center space-x-2 transform transition hover:scale-105 hidden md:flex`}
                >
                    <span>TIT DevComm</span>
                </Link>

                {/* Mobile Layout: Hamburger on left, Logo in center, Dark mode toggle on right */}
                <div className="md:hidden flex w-full items-center justify-between">
                    {/* Hamburger Menu on Left */}
                    <button onClick={toggleMobileMenu} className={`${darkMode ? 'text-white' : 'text-gray-800'} focus:outline-none`}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    
                    {/* Logo in Center for Mobile */}
                    <Link
                        to="/"
                        className={`text-xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} flex items-center space-x-2 transform transition hover:scale-105`}
                    >
                        <span>TIT DevComm</span>
                    </Link>
                    
                    {/* Dark Mode Toggle on Right */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-all duration-300 ${darkMode
                                ? 'bg-gray-800 text-yellow-300'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                    {navLinks.map((link, index) => {
                        const active = isLinkActive(link.path);

                        return (
                            <Link
                                key={index}
                                ref={(el) => (linkRefs.current[index] = el)}
                                to={link.path}
                                className={`relative pb-1 transition-all duration-300 ${active
                                        ? `font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`
                                        : darkMode ? 'text-white' : 'text-gray-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Dark Mode Toggle & Join Us Buttons - Desktop Only */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Dark Mode Toggle - Improved */}
                    <button
                        ref={toggleRef}
                        onClick={toggleDarkMode}
                        className="relative focus:outline-none"
                        aria-label="Toggle dark mode"
                    >
                        <div className="w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full px-1">
                            {/* Toggle Background */}
                            <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} transition-colors duration-300`}></div>

                            {/* Sun Icon */}
                            <Sun
                                size={16}
                                className={`absolute right-2 text-yellow-500 transition-all duration-300 ${darkMode ? 'opacity-40 scale-90' : 'opacity-100 scale-100'
                                    }`}
                            />

                            {/* Moon Icon */}
                            <Moon
                                size={16}
                                className={`absolute left-2 text-blue-200 transition-all duration-300 ${darkMode ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                                    }`}
                            />

                            {/* Toggle Circle Indicator */}
                            <div
                                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 ease-in-out ${darkMode ? 'translate-x-7' : 'translate-x-0'
                                    }`}
                            />
                        </div>
                    </button>

                    {/* Join Us Button */}
                    <Link
                        ref={joinButtonRef}
                        to="/join-us"
                        className={`${darkMode
                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            } text-white px-5 py-2 rounded-full transition-all`}
                    >
                        Join Us
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className={`fixed top-16 left-0 w-full ${darkMode
                            ? 'bg-gray-900/95 text-white'
                            : 'bg-gray-100/95 text-gray-800'
                        } backdrop-blur-md shadow-lg md:hidden`}
                >
                    <div className="container mx-auto px-4 py-4">
                        {navLinks.map((link, index) => {
                            const active = isLinkActive(link.path);

                            return (
                                <Link
                                    key={index}
                                    to={link.path}
                                    onClick={toggleMobileMenu}
                                    className={`block py-3 border-b ${darkMode ? 'border-gray-700' : ''
                                        } last:border-b-0 transition-all duration-300 transform ${active
                                            ? `font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`
                                            : darkMode ? 'text-white' : 'text-gray-800'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        {/* Add Join Us to mobile menu too */}
                        <Link
                            to="/join-us"
                            onClick={toggleMobileMenu}
                            className={`block py-3 ${darkMode
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                } text-white rounded-md text-center mt-4`}
                        >
                            Join Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;