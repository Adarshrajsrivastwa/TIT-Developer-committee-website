/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import PhotoSlider from "./PhotoSlider";

const HeroSection = () => {
    const heroRef = useRef(null);
    const typedRef = useRef(null);

    useEffect(() => {
        const heroElements = heroRef.current.querySelectorAll('.animate-element');

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

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: [
                "<span class='font-bold text-gray-900'>Empowering Juniors, Led by Seniors</span>",
                "<span class='font-semibold text-gray-700 text-4xl'>90%+ ATS-Friendly Resumes</span>",
                "<span class='font-semibold text-gray-700 text-4xl'>Mastering Versatile Tech Domains</span>",
                "<span class='font-semibold text-gray-700 text-4xl  '>Empowered 15+ Students in Machine Learning</span>"
            ],
            typeSpeed: 50,
            backSpeed: 25,
            startDelay: 500,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: "|",
            contentType: 'html'
        });
        return () => typed.destroy();
    }, []);

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center
            px-6 md:px-12 overflow-hidden text-center md:text-left mt-20"
        >
            {/* Photo Slider for Mobile */}
            <div className="block md:hidden w-full max-w-md mx-auto mb-2">
                <PhotoSlider />
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-4">
                {/* Left Content */}
                <div className="space-y-6 md:pr-12">
                    <h1
                        className="animate-element text-4xl md:text-6xl leading-tight"
                    >
                        <span ref={typedRef}></span>
                    </h1>

                    <p className="animate-element text-lg md:text-xl text-gray-600 max-w-md md:max-w-xl mx-auto md:mx-0">
                        Join the Revolution of Tech Learning and Mentorship. Transforming students into industry-ready professionals.
                    </p>

                    <div className="flex justify-center md:justify-start">
                        <Link to="/join-us">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="animate-element bg-indigo-600 text-white px-6 md:px-8 py-3 rounded-full text-lg font-semibold 
                                hover:bg-indigo-800 transition-colors flex items-center group"
                            >
                                Join Us Now
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Right Content - Photo Slider (Only for Desktop) */}
                <div className="hidden md:block mt-0">
                    <PhotoSlider />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;