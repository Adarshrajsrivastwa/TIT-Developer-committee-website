/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import PhotoSlider from "./PhotoSlider";

const HeroSection = () => {
    const heroRef = useRef(null);
    const typedRef = useRef(null);
    const photoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const circleImages = [
        "/assets/img/mentor-img/Anand-Soni.jpeg",
        "/assets/img/mentor-img/Ankit-Kumar.jpeg",
        "/assets/img/mentor-img/Ankit-Patel.jpeg",
    ];

    useEffect(() => {
        const heroElements = heroRef.current.querySelectorAll('.animate-element');

        gsap.fromTo(
            heroElements,
            {
                opacity: 0,
                y: 0,
                scale: 0,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.2,
                duration: 2,
                ease: "elastic.out",
                onComplete: () => setIsLoaded(true)
            }
        );
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const circles = document.querySelectorAll('.bg-circle');

            gsap.to(circles, {
                x: "random(-50, 50, 5)",
                y: "random(-50, 50, 5)",
                rotation: "random(0, 15, 5)",
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });
        }
    }, [isLoaded]);

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
            className="relative max-h-screen flex flex-col items-center
            px-6 md:px-12 overflow-hidden text-center md:text-left mt-20"
        >
            {/* Background Circles with Images (Only for Desktop) */}
            <div className="hidden md:block absolute inset-0 overflow-hidden -z-10">
                {circleImages.map((img, index) => {
                    const size = 100 + index * 20;
                    const top = index % 2 === 0 ? Math.min(75, Math.max(10, 15 + index * 10)) : Math.min(80, Math.max(20, 65 - index * 10));
                    const left = Math.min(85, Math.max(5, (index * 20) % 90));

                    return (
                        <div
                            key={index}
                            className={`bg-circle absolute rounded-full overflow-hidden 
                           shadow-lg opacity-40 hover:opacity-60 transition-opacity
                           border-2 border-indigo-100`}
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                top: `${top}%`,
                                left: `${left}%`,
                                zIndex: -5
                            }}
                        >
                            <img
                                src={img}
                                alt="Background element"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Photo Slider for Mobile */}
            <div className="block md:hidden w-full max-w-md mx-auto mb-2 z-10">
                <PhotoSlider />
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-4 z-10">
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
                <div className="hidden md:block mt-0 z-10">
                    <PhotoSlider />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
