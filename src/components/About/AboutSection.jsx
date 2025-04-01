import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    CodeIcon,
    LaptopIcon,
    UsersIcon,
    AwardIcon,
    BookOpenIcon,
    NetworkIcon
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Utility function to split plain text into words wrapped in spans
const splitTextToSpans = (element) => {
    if (!element) return;
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word dark:text-gray-200" style="display: inline-block;">${word}</span>`).join(' ');
};

// Utility function to split text nodes into words while preserving HTML
const splitTextNodesToSpans = (element) => {
    if (!element) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
        nodes.push(node);
    }
    nodes.forEach((textNode) => {
        const text = textNode.nodeValue;
        const words = text.split(' ');
        const spanContainer = document.createDocumentFragment();
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word dark:text-gray-300';
            span.style.display = 'inline-block';
            span.textContent = word;
            spanContainer.appendChild(span);
            if (index < words.length - 1) {
                spanContainer.appendChild(document.createTextNode(' '));
            }
        });
        textNode.parentNode.replaceChild(spanContainer, textNode);
    });
};

// WhyJoinSection Component
const WhyJoinSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const benefitsRef = useRef([]);

    const benefits = [
        {
            icon: <CodeIcon className="text-blue-500" size={40} />,
            title: "Hands-on Learning",
            description: "Engage in real-world projects that bridge academic knowledge with industry requirements."
        },
        {
            icon: <LaptopIcon className="text-green-500" size={40} />,
            title: "Exclusive Workshops",
            description: "Access cutting-edge workshops and hackathons led by industry-experienced seniors."
        },
        {
            icon: <UsersIcon className="text-purple-500" size={40} />,
            title: "Personalized Mentorship",
            description: "Receive one-on-one guidance from seniors who have succeeded in the tech industry."
        },
        {
            icon: <AwardIcon className="text-amber-500" size={40} />,
            title: "Portfolio Development",
            description: "Build a robust technical portfolio that stands out during placement opportunities."
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const benefits = benefitsRef.current;


        // Split heading text into words
        splitTextToSpans(heading);

        // After splitting, find words to color
        heading.querySelectorAll('.word').forEach(word => {
            if (word.textContent === 'Join') {
                word.style.color = '#4f46e5';
            }
        });

        // Animate words in the heading
        gsap.fromTo(
            heading.querySelectorAll('.word'),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Scroll-triggered animation for the entire section
        gsap.fromTo(
            section,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Staggered animation for benefits
        benefits.forEach((benefit, index) => {
            gsap.fromTo(
                benefit,
                { opacity: 0, x: -50, scale: 0.9 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.7,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 ref={headingRef} className="text-4xl font-extrabold text-gray-900 mb-4">
                        Why <span>Join</span> Us?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Transform your technical journey with our comprehensive community support
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            ref={el => benefitsRef.current[index] = el}
                            className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="mr-4 bg-white dark:bg-gray-600 p-3 rounded-full shadow-md">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{benefit.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// MissionSection Component
const MissionSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const statsRef = useRef([]);

    const stats = [
        {
            icon: <BookOpenIcon className="text-blue-500" size={40} />,
            number: "90%+",
            label: "ATS-Friendly Resumes"
        },
        {
            icon: <NetworkIcon className="text-green-500" size={40} />,
            number: "15+",
            label: "Machine Learning Students Empowered"
        },
        {
            icon: <UsersIcon className="text-purple-500" size={40} />,
            number: "30+",
            label: "Cybersecurity Enthusiasts Mentored"
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const stats = statsRef.current;

        // Split heading text into words
        splitTextToSpans(heading);

        // Animate words in the heading
        gsap.fromTo(
            heading.querySelectorAll('.word'),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Background animation
        gsap.fromTo(
            section,
            { backgroundPosition: '0% 50%' },
            {
                backgroundPosition: '100% 50%',
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            }
        );

        // Stats animation
        stats.forEach((stat, index) => {
            gsap.fromTo(
                stat,
                { opacity: 0, scale: 0.8, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    delay: index * 0.3,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-r from-indigo-700 dark:from-indigo-900 via-purple-700 to-pink-700 text-white py-16 px-4"
        >
            <div className="container mx-auto text-center">
                <h2 ref={headingRef} className="text-4xl font-extrabold mb-8">
                    Our <span>Impact</span> in Numbers
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            ref={el => statsRef.current[index] = el}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="flex justify-center items-center mb-4">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-white">{stat.number}</p>
                                <p className="text-white/80">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// AboutComp Component
const AboutComp = () => {



    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textContainerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const textContainer = textContainerRef.current;

        // Split heading text into words
        splitTextToSpans(heading);

        // After splitting, find "TIT", "Developer", "Community" words and color them
        heading.querySelectorAll('.word').forEach(word => {
            if (word.textContent === 'TIT' || word.textContent === 'Developer' || word.textContent === 'Community') {
                word.style.color = '#4f46e5';
            }
        });

        // Animate words in the heading
        gsap.fromTo(
            heading.querySelectorAll('.word'),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate the paragraphs
        const paragraphs = textContainer.querySelectorAll('p');
        paragraphs.forEach((paragraph) => {
            splitTextNodesToSpans(paragraph);
            gsap.fromTo(
                paragraph.querySelectorAll('.word'),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    delay: 0.5,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: paragraph,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <div>
            <header ref={sectionRef} className="py-16">
                <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center mt-10">
                    {/* Text Section */}
                    <div ref={textContainerRef} className="md:w-1/2 text-center md:text-left">
                        <h1 ref={headingRef} className="text-3xl md:text-5xl font-extrabold mb-10 md:mb-10">
                            <span className="text-gray-900">About</span>{' '}
                            <span>TIT Developer Community</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            A student-led initiative bridging the gap between juniors and seniors through free mentorship and hands-on learning.
                            <br />
                            <br />
                            <b className="text-indigo-600">Our mission:</b> Empower students with real-world knowledge, industry insights, and hands-on learning.
                            <br />
                            <br />
                            We offer guidance through mentorship programs, hackathons, and workshops to help students succeed in the tech industry.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className=" w-72 md:w-1/2 flex justify-center">
                        <img
                            src="https://res.cloudinary.com/dltyctci9/image/upload/v1743400481/buwmxwhjlpdithdaa1bl.svg"
                            alt="Developer Community"
                            className="w-full max-w-md md:max-w-lg rounded-lg mb-20 md:mb-0"
                        />
                    </div>
                </div>
            </header>
            <WhyJoinSection />
            <MissionSection />
        </div>
    );
};
export default AboutComp;