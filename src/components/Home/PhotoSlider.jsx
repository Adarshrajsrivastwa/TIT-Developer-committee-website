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
    const intervalRef = useRef(null);

    // Preload images to avoid flashes
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

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
        intervalRef.current = setInterval(nextSlide, 4000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg flex justify-center items-center">
                <AnimatePresence initial={false}>
                    <motion.img
                        src={images[currentIndex]}
                        key={currentIndex} // Keep it here but optimize rendering
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="w-full h-auto max-h-[80vh] object-contain"
                        alt={`Community Event ${currentIndex + 1}`}
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons and Pagination Dots */}
            <div className="flex items-center gap-4 mt-4">
                <button
                    onClick={prevSlide}
                    className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition-transform"
                >
                    <ChevronLeft className="text-gray-800 w-6 h-6" />
                </button>

                <div className="flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? "bg-gray-800 scale-125" : "bg-gray-400"}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition-transform"
                >
                    <ChevronRight className="text-gray-800 w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default PhotoSlider;