import React, { useEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/Home/HeroSection.jsx';
import ImpactSection from '../components/Home/ImpactSection';
import FAQSection from '../components/Home/FAQSection.jsx';
import Contact from '../components/Home/Conatct.jsx';
// import { ThemeContext } from '../components/Theme/ThemeContext.jsx';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

function Home() {

  // const { darkMode } = useContext(ThemeContext);

  const sectionRefs = {
    hero: useRef(null),
    photoSlider: useRef(null),
    impact: useRef(null),
    faqs: useRef(null),
    contactUs: useRef(null)
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
    <div className={`flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <div ref={sectionRefs.hero}>
        <HeroSection />
      </div>

      <div ref={sectionRefs.impact}>
        <ImpactSection />
      </div>
      <div ref={sectionRefs.faqs}>
        <FAQSection />
      </div>
      <div ref={sectionRefs.contactUs}>
        <Contact />
      </div>
    </div>
  );
}

export default Home;