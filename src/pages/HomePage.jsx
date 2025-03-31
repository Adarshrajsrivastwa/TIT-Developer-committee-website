import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/Home/HeroSection.jsx';
import ImpactSection from '../components/Home/ImpactSection';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sectionRefs = {
    hero: useRef(null),
    photoSlider: useRef(null),
    impact: useRef(null)
  };

  useEffect(() => {
    // Scroll-triggered animations
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  });

  return (
    <div className="flex flex-col min-h-screen mt-8 bg-gray-100">
      <div ref={sectionRefs.hero}>
        <HeroSection />
      </div>

      <div ref={sectionRefs.impact}>
        <ImpactSection />
      </div>
    </div>
  );
}

export default Home;