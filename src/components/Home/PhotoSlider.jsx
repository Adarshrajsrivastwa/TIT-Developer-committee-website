/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    '/assets/img/home-img/event-1.jpeg',
    '/assets/img/home-img/event-2.jpeg',
    '/assets/img/home-img/event-3.jpeg',
    '/assets/img/home-img/event-4.jpeg',
    '/assets/img/home-img/event-5.jpeg',
    '/assets/img/home-img/event-6.jpeg',
    '/assets/img/home-img/event-7.jpeg',
    '/assets/img/home-img/event-8.jpeg',
    '/assets/img/home-img/event-9.jpeg',
    '/assets/img/home-img/event-10.jpeg',
    '/assets/img/home-img/event-11.jpeg',
];

const PhotoSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    // Function to go to the next slide
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-slide effect
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Our Community in Action
            </h2>

            <div
                ref={sliderRef}
                className="relative w-full max-w-4xl mx-auto h-[500px] overflow-hidden rounded-xl shadow-lg"
            >
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{
                            type: "tween",
                            duration: 0.5
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt={`Community Event ${currentIndex + 1}`}
                    />
                </AnimatePresence>

                {/* Previous Slide Button */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 
                     bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md
                     hover:bg-white hover:scale-110 transition-transform"
                >
                    <ChevronLeft className="text-gray-800 w-6 h-6" />
                </button>

                {/* Next Slide Button */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 
                     bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md
                     hover:bg-white hover:scale-110 transition-transform"
                >
                    <ChevronRight className="text-gray-800 w-6 h-6" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-gray-800 scale-125" : "bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhotoSlider;
