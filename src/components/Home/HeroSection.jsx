/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const heroElements = heroRef.current.children;

        gsap.fromTo(
            heroElements,
            {
                opacity: 0,
                y: 50,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
            }
        );
    }, []);

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-center items-center 
        bg-gradient-to-br from-blue-50 to-purple-100 text-center px-4 overflow-hidden"
        >
            {/* Floating Mentor Images */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <motion.img
                    src="/assets/img/mentor-img/Ankit-Kumar.jpeg"
                    alt="Mentor 1"
                    className="
          absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full shadow-lg animate-blob
          top-10 left-5 sm:top-20 sm:left-10
        "
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.img
                    src="/assets/img/mentor-img/Anand-Soni.jpeg"
                    alt="Mentor 2"
                    className="
          absolute w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full shadow-lg animate-blob
          bottom-5 right-10 sm:bottom-10 sm:right-20 md:right-40
        "
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.img
                    src="/assets/img/mentor-img/Ankit-Patel.jpeg"
                    alt="Mentor 3"
                    className="
          absolute w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-lg animate-blob
          top-10 right-5 sm:top-1/3 sm:right-10 md:right-20
        "
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Main Hero Text */}
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 relative z-10"
            >
                Empowering Juniors, Led by Seniors
            </motion.h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto relative z-10">
                Join the Revolution of Tech Learning and Mentorship. Transforming students into industry-ready professionals.
            </p>

            {/* Join Us Button */}
            <Link to="/join-us">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
          hover:bg-indigo-800 transition-colors flex items-center group relative z-10"
                >
                    Join Us Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button></Link>

        </div>
    );
};

export default HeroSection;
