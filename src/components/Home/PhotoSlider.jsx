import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PhotoSlider = () => {
    // Sample photo data - replace with your actual images
    const photos = [
        { id: 1, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400687/dhrvsjoq3d8l6st70xpx.jpg', alt: 'Photo 1' },
        { id: 2, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400683/rsteyaqckimki1uiikwx.jpg', alt: 'Photo 2' },
        { id: 3, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400680/odxtqfjegyscjzjndvqz.jpg', alt: 'Photo 3' },
        { id: 4, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400680/skkfjiudrcxzzroxluwx.jpg', alt: 'Photo 4' },
        { id: 5, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400668/kujy1lxntjfj7apcbtoe.jpg', alt: 'Photo 5' },
        { id: 6, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400668/dhitdwicoj2q9ded6giv.jpg', alt: 'Photo 6' },
        { id: 7, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400663/nfubk1geth5p772hezji.jpg', alt: 'Photo 7' },
        { id: 8, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400657/bjbkpxymncirsacx4o6l.jpg', alt: 'Photo 8' },
        { id: 9, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400656/huqxp8zw2cxw9ldyl4ek.jpg', alt: 'Photo 9' },
        { id: 10, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400656/w4dvwwidsspnpgpqfnzi.jpg', alt: 'Photo 10' },
        { id: 11, url: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743400640/jhdcqj882e1jupujwsou.jpg', alt: 'Photo 11' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef([]);
    const [isMobile, setIsMobile] = useState(false);

    // Animation constants with improved values
    const ANIMATION_CONFIG = {
        duration: { in: 0.8, out: 0.6 },
        slideOffset: 100,
        scale: { active: 1, inactive: 0.85 },
        autoplayInterval: 5000,
        ease: {
            in: "power3.out",
            out: "power2.in",
            overall: "power2.inOut"
        }
    };

    // Check if device is mobile with throttled resize handler
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Throttle function for better performance
        let resizeTimeout;
        const throttledCheckMobile = () => {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    resizeTimeout = null;
                    checkMobile();
                }, 250);
            }
        };

        // Check on initial load
        checkMobile();

        // Add event listener for window resize
        window.addEventListener('resize', throttledCheckMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', throttledCheckMobile);
            clearTimeout(resizeTimeout);
        };
    }, []);

    // Initialize GSAP animations with improved memory management
    useEffect(() => {
        // Set initial state for all slides
        gsap.set(slidesRef.current, {
            autoAlpha: 0,
            x: ANIMATION_CONFIG.slideOffset,
            scale: ANIMATION_CONFIG.scale.inactive,
            force3D: true
        });

        // Show the first slide with improved easing
        gsap.to(slidesRef.current[currentIndex], {
            duration: ANIMATION_CONFIG.duration.in,
            autoAlpha: 1,
            x: 0,
            scale: ANIMATION_CONFIG.scale.active,
            ease: ANIMATION_CONFIG.ease.in,
            force3D: true
        });

        // Return cleanup function
        return () => gsap.killTweensOf(slidesRef.current);
    }, []);

    // Handle slide transition with improved timing and effects
    const goToSlide = (index) => {
        if (index === currentIndex) return;

        // Pause autoplay during manual navigation
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = setTimeout(startAutoplay, ANIMATION_CONFIG.autoplayInterval);
        }

        const direction = index > currentIndex ? 1 : -1;
        const tl = gsap.timeline({
            defaults: { force3D: true }
        });

        // Cache slide references
        const currentSlide = slidesRef.current[currentIndex];
        const nextSlide = slidesRef.current[index];

        // Stop any running animations
        gsap.killTweensOf([currentSlide, nextSlide]);

        // Add slight rotation for more dynamic effect
        const rotationAmount = isMobile ? 2 : 4;

        // Animate out current slide
        tl.to(currentSlide, {
            duration: ANIMATION_CONFIG.duration.out,
            autoAlpha: 0,
            x: -ANIMATION_CONFIG.slideOffset * direction,
            scale: ANIMATION_CONFIG.scale.inactive,
            rotationY: -rotationAmount * direction,
            ease: ANIMATION_CONFIG.ease.out
        });

        // Prepare next slide with initial rotation
        tl.set(nextSlide, {
            autoAlpha: 0,
            x: ANIMATION_CONFIG.slideOffset * direction,
            scale: ANIMATION_CONFIG.scale.inactive,
            rotationY: rotationAmount * direction
        }, 0);

        // Animate in next slide with improved timing
        tl.to(nextSlide, {
            duration: ANIMATION_CONFIG.duration.in,
            autoAlpha: 1,
            x: 0,
            scale: ANIMATION_CONFIG.scale.active,
            rotationY: 0,
            ease: ANIMATION_CONFIG.ease.in
        }, ANIMATION_CONFIG.duration.out * 0.6);

        // Update state after animation completes
        tl.call(() => setCurrentIndex(index));
    };

    // Autoplay management with refs to prevent stale closures
    const autoplayRef = useRef(null);

    const startAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
        }

        autoplayRef.current = setInterval(() => {
            const newIndex = (currentIndex + 1) % photos.length;
            goToSlide(newIndex);
        }, ANIMATION_CONFIG.autoplayInterval);
    };

    // Navigation functions
    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % photos.length;
        goToSlide(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + photos.length) % photos.length;
        goToSlide(newIndex);
    };

    // Auto-advance slides with pause on interaction
    useEffect(() => {
        startAutoplay();

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [currentIndex, photos.length]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
            {/* Main slider container - Adjusted height for mobile */}
            <div className="relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 h-60 sm:h-80 md:h-96">
                {/* Slides */}
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        ref={el => (slidesRef.current[index] = el)}
                        className="absolute inset-0 w-full h-full"
                        style={{ visibility: 'hidden' }} // GSAP handles visibility
                    >
                        <img
                            src={photo.url}
                            alt={photo.alt}
                            className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'}`}
                        />
                    </div>
                ))}
            </div>

            {/* Controls container - Mobile responsive */}
            <div className="mt-2 sm:mt-4 flex justify-center gap-2 sm:gap-5 items-center">
                {/* Navigation arrows */}
                <button
                    onClick={prevSlide}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-1 sm:p-2 rounded-full transition-colors"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Indicator dots - Responsive for mobile */}
                <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 max-w-xs sm:max-w-none">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors flex-shrink-0 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400 hover:bg-gray-600'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-1 sm:p-2 rounded-full transition-colors"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PhotoSlider;