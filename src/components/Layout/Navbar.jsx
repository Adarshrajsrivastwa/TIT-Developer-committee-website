/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const linkRefs = useRef([]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Mentors", path: "/mentors" },
        { name: "Events", path: "/events" },
        { name: "Hall of Fame", path: "/hall-of-fame" },
    ];

    useEffect(() => {
        gsap.fromTo(
            navRef.current.children,
            { opacity: 0, y: -20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
        );

        // Mobile Menu Animation
        if (mobileMenuRef.current) {
            gsap.fromTo(
                mobileMenuRef.current.children,
                { opacity: 0, x: -50, scale: 0.9 },
                { opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -50, scale: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
            );
        }

        // Link Hover Animations (Underline + Scale)
        linkRefs.current.forEach((link, index) => {
            if (link) {
                gsap.set(link, { position: "relative", overflow: "hidden" });

                const underline = document.createElement("span");
                underline.classList.add("absolute", "bottom-0", "left-0", "w-0", "h-[2px]", "bg-indigo-600", "transition-all", "duration-300");
                link.appendChild(underline);

                link.addEventListener("mouseenter", () => {
                    gsap.to(underline, { width: "100%", duration: 0.1 });
                    gsap.to(link, { scale: 1.05, duration: 0.2 });
                });

                link.addEventListener("mouseleave", () => {
                    gsap.to(underline, { width: "0%", duration: 0.1 });
                    gsap.to(link, { scale: 1, duration: 0.2 });
                });
            }
        });

    }, [isOpen]);

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center space-x-2 transform transition hover:scale-105">
                    <span>TIT DevComm</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center w-full absolute top-4 left-1/2 transform -translate-x-1/2 px-6">
                    {/* Navigation Links - Center */}
                    <div className="flex-1 flex justify-center space-x-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                ref={(el) => (linkRefs.current[index] = el)}
                                to={link.path}
                                className={'relative pb-1 transition-all duration-300'}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Join Us Button - Right */}
                    <div className="flex justify-end">
                        <Link
                            to="/join-us"
                            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all"
                        >
                            Join Us
                        </Link>
                    </div>
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
                <div ref={mobileMenuRef} className="fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg md:hidden">
                    <div className="container mx-auto px-4 py-4">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                onClick={toggleMobileMenu}
                                className={`block py-3 border-b last:border-b-0 transition-all duration-300 transform`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
