import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const logoRef = useRef(null);
    const joinButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const linkRefs = useRef([]);
    const initialLoadComplete = useRef(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Mentors", path: "/mentors" },
        { name: "Events", path: "/events" },
        { name: "Hall of Fame", path: "/hall-of-fame" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "FAQs", path: "/faqs" },
        { name: "Contact Us", path: "/contact-us" },
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

        // 3. Join Us button
        if (joinButtonRef.current) {
            tl.fromTo(
                joinButtonRef.current,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
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
                underline.classList.add("nav-underline", "absolute", "bottom-0", "left-0", "h-[2px]", "bg-indigo-600", "transition-all", "duration-300");
                link.appendChild(underline);

                // Set initial state
                gsap.set(link, { position: "relative", overflow: "hidden" });

                if (active) {
                    gsap.set(underline, { width: "100%" });
                    gsap.set(link, { fontWeight: "bold", color: "#4f46e5" });
                } else {
                    gsap.set(underline, { width: "0%" });
                    gsap.set(link, { fontWeight: "normal", color: "#1f2937" });

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
    }, [currentPath]);

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-100/5">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
                {/* Logo */}
                <Link
                    ref={logoRef}
                    to="/"
                    className="text-2xl font-bold text-indigo-600 flex items-center space-x-2 transform transition hover:scale-105"
                >
                    <span>TIT DevComm</span>
                </Link>

                {/* Desktop Navigation - Changed from absolute to flex layout */}
                <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                    {navLinks.map((link, index) => {
                        const active = isLinkActive(link.path);

                        return (
                            <Link
                                key={index}
                                ref={(el) => (linkRefs.current[index] = el)}
                                to={link.path}
                                className={`relative pb-1 transition-all duration-300 ${active ? "font-bold text-indigo-600" : "text-gray-800"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Join Us Button */}
                <div className="hidden md:block">
                    <Link
                        ref={joinButtonRef}
                        to="/join-us"
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all"
                    >
                        Join Us
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-gray-800 focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div ref={mobileMenuRef} className="fixed top-16 left-0 w-full bg-gray-100/95 backdrop-blur-md shadow-lg md:hidden">
                    <div className="container mx-auto px-4 py-4">
                        {navLinks.map((link, index) => {
                            const active = isLinkActive(link.path);

                            return (
                                <Link
                                    key={index}
                                    to={link.path}
                                    onClick={toggleMobileMenu}
                                    className={`block py-3 border-b last:border-b-0 transition-all duration-300 transform ${active ? "font-bold text-indigo-600" : "text-gray-800"
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
                            className="block py-3 text-white bg-indigo-600 rounded-md text-center mt-4"
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
