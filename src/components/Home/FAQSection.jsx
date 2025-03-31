import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle, Code, Users, Award } from "lucide-react";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is TIT Developers Committee?",
    answer:
      "TIT Developers Committee is a student-led tech community that provides mentorship, workshops, and hackathons to bridge the gap between juniors and seniors.",
  },
  {
    question: "Who can join the committee?",
    answer:
      "Any student interested in tech, coding, or development can join the committee, regardless of experience level.",
  },
  {
    question: "Are there any membership fees?",
    answer:
      "No, joining TIT Developers Committee is completely free. We believe in open learning and collaboration.",
  },
  {
    question: "What events do you organize?",
    answer:
      "We organize coding bootcamps, hackathons, workshops, and mentorship sessions led by seniors and industry professionals.",
  },
  {
    question: "How can I participate in a hackathon?",
    answer:
      "Keep an eye on our announcements and register through the provided links. We also guide participants on how to prepare.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const faqRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const faqs = faqRefs.current;

    // Fade-in animation for the section
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );

    // Staggered animation for FAQ items
    faqs.forEach((faq, index) => {
      gsap.fromTo(
        faq,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
          },
        }
      );
    });

    // Floating icons animation
    gsap.to(".floating-icon", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "power1.inOut",
    });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-gray-100 py-16 overflow-hidden mt-10"
    >
      {/* Floating Icons */}
      <div className="absolute top-10 left-10 text-blue-400 floating-icon opacity-20">
        <MessageCircle size={40} />
      </div>
      <div className="absolute bottom-10 right-16 text-green-400 floating-icon opacity-20">
        <Code size={40} />
      </div>
      <div className="absolute top-1/2 left-1/3 text-indigo-400 floating-icon opacity-20">
        <Users size={40} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-amber-400 floating-icon opacity-20">
        <Award size={40} />
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className="border-b border-gray-300 py-4 transition-all duration-300 hover:bg-gray-100 rounded-md"
            >
              <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 px-4 py-2 focus:outline-none transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-indigo-500" : ""
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 opacity-100 py-2 px-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;