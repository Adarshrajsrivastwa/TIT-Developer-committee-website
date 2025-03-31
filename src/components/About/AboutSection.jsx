import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
<<<<<<< HEAD
=======
import { motion } from 'framer-motion';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
import {
    CodeIcon,
    LaptopIcon,
    UsersIcon,
    AwardIcon,
    BookOpenIcon,
    NetworkIcon
} from 'lucide-react';

// Register ScrollTrigger plugin
<<<<<<< HEAD
gsap.registerPlugin(ScrollTrigger);

// Utility function to split plain text into words wrapped in spans
const splitTextToSpans = (element) => {
    if (!element) return;
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word" style="display: inline-block;">${word}</span>`).join(' ');
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
            span.className = 'word';
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
=======
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const WhyJoinSection = () => {
    const sectionRef = useRef(null);
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
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
<<<<<<< HEAD
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

=======
        const benefits = benefitsRef.current;

>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
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
<<<<<<< HEAD
                    toggleActions: 'play none none none'
=======
                    toggleActions: 'play none none reverse'
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                }
            }
        );

        // Staggered animation for benefits
        benefits.forEach((benefit, index) => {
            gsap.fromTo(
                benefit,
<<<<<<< HEAD
                { opacity: 0, x: -50, scale: 0.9 },
=======
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.9
                },
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.7,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
<<<<<<< HEAD
                        toggleActions: 'play none none none'
=======
                        toggleActions: 'play none none reverse'
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                    }
                }
            );
        });
    }, []);

    return (
<<<<<<< HEAD
        <section ref={sectionRef} className="py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 ref={headingRef} className="text-4xl font-extrabold text-gray-900 mb-4">
                        Why <span>Join</span> Us?
=======
        <section
            ref={sectionRef}
            className="bg-white py-16 px-4"
        >
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Why <span className="text-indigo-600">Join</span> Us?
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transform your technical journey with our comprehensive community support
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            ref={el => benefitsRef.current[index] = el}
<<<<<<< HEAD
                            className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
=======
                            className="bg-gray-50 rounded-2xl p-6 
                border border-gray-100 
                hover:shadow-xl 
                transition-all duration-300 
                transform hover:-translate-y-2 
                group"
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                        >
                            <div className="flex items-center mb-4">
                                <div className="mr-4 bg-white p-3 rounded-full shadow-md">
                                    {benefit.icon}
                                </div>
<<<<<<< HEAD
                                <h3 className="text-2xl font-bold text-gray-800">{benefit.title}</h3>
                            </div>
                            <p className="text-gray-600">{benefit.description}</p>
=======
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {benefit.title}
                                </h3>
                            </div>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

<<<<<<< HEAD
// MissionSection Component
const MissionSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
=======
const MissionSection = () => {
    const sectionRef = useRef(null);
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
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
<<<<<<< HEAD
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

=======
        const stats = statsRef.current;

>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
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
<<<<<<< HEAD
                { opacity: 0, scale: 0.8, y: 50 },
=======
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 50
                },
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    delay: index * 0.3,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
<<<<<<< HEAD
                        toggleActions: 'play none none none'
=======
                        toggleActions: 'play none none reverse'
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                    }
                }
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
<<<<<<< HEAD
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 px-4"
        >
            <div className="container mx-auto text-center">
                <h2 ref={headingRef} className="text-4xl font-extrabold mb-8">
=======
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        bg-size-200 text-white py-16 px-4"
        >
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-extrabold mb-8">
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                    Our Impact in Numbers
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            ref={el => statsRef.current[index] = el}
<<<<<<< HEAD
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
=======
                            className="bg-white/10 backdrop-blur-sm 
                rounded-2xl p-6 
                hover:bg-white/20 
                transition-all duration-300"
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
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

<<<<<<< HEAD
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
        <div className="bg-gray-100">
            <header ref={sectionRef} className="bg-gray-100 py-16 mt-10">
                <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
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
=======
// const AboutComp = () => {
//     return (
//         <div className="bg-gray-50">
//             <header className="bg-white py-16 mt-10">
//                 <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">

//                     {/* Text Section */}
//                     <div className="md:w-1/2 text-center md:text-left">
//                         <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
//                             About <span className="text-indigo-600">TIT Developer Community</span>
//                         </h1>
//                         <p className="text-xl text-gray-600 max-w-2xl">
//                             A student-led initiative bridging the gap between juniors and seniors through free mentorship and hands-on learning.
//                         </p>
//                         <br />
//                         <p className="text-xl text-gray-600 max-w-2xl">
//                             <b className="text-indigo-600">Our mission:</b> Empower students with real-world knowledge, industry insights, and hands-on learning.
//                         </p>
//                         <br />
//                         <p className="text-xl text-gray-600 max-w-2xl">
//                             We offer guidance through mentorship programs, hackathons, and workshops to help students succeed in the tech industry.
//                         </p>
//                     </div>

//                     {/* Image Section */}
//                     <div className="md:w-1/2 flex justify-center">
//                         <img
//                             src="/assets/img/about-img/about.svg"
//                             alt="Developer Community"
//                             className="w-full max-w-md md:max-w-lg rounded-lg"
//                         />
//                     </div>
//                 </div>
//             </header>

//             <WhyJoinSection />
//             <MissionSection />
//         </div>
//     );
// };

// new code

const AboutComp = () => {
    const headingRef = useRef([]);
    const textRef = useRef([]);
    const imageRef = useRef(null);
    const floatingIconsRef = useRef([]);
    const bgRef = useRef(null);

    useEffect(() => {
        // Heading animation: Letters appear one by one
        gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.08,
            ease: "power2.out",
        });

        // Paragraph animations after heading
        gsap.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 1.5,
            stagger: 0.3,
            ease: "power2.out",
        });

        // Image animation: Bobbing effect (subtle up-down motion)
        gsap.to(imageRef.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
        });

        // Floating Icons Animation (looping movement)
        floatingIconsRef.current.forEach((icon, index) => {
            gsap.to(icon, {
                y: 15,
                rotation: 360,
                repeat: -1,
                yoyo: true,
                duration: 3 + index * 0.5,
                ease: "sine.inOut",
            });
        });

        // Subtle background gradient shift animation
        gsap.to(bgRef.current, {
            backgroundPosition: "100% 50%",
            repeat: -1,
            duration: 5,
            yoyo: true,
            ease: "linear",
        });
    }, []);

    // Function to break text into individual letters with spaces
    const splitText = (text, colorClass, headingRef) => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                ref={(el) => {
                    if (el) headingRef.current.push(el); // Ensure ref exists before pushing
                }}
                className={`opacity-0 translate-y-5 inline-block ${colorClass}`}
            >
                {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
            </span>
        ));
    };
    

    return (
        <div ref={bgRef} className="bg-gray-50 bg-gradient-to-r from-gray-100 to-gray-200 transition-all duration-500">
            <header className="bg-white py-16 mt-10 relative">
                <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">

                    {/* Text Section */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            {splitText("About", "text-black")} {/* Black color */}
                            {splitText(" TIT Developer", "text-indigo-600")} {/* Indigo color */}
                            <br />
                            {splitText("Community", "text-indigo-600")} {/* Community on a new line */}
                        </h1>

                        <p
                            ref={(el) => textRef.current[0] = el}
                            className="text-xl text-gray-600 max-w-2xl opacity-0 translate-y-5"
                        >
                            A student-led initiative bridging the gap between juniors and seniors
                            through free mentorship and hands-on learning.
                        </p>
                        <br />
                        <p
                            ref={(el) => textRef.current[1] = el}
                            className="text-xl text-gray-600 max-w-2xl opacity-0 translate-y-5"
                        >
                            <b className="text-indigo-600">Our mission:</b> Empower students with
                            real-world knowledge, industry insights, and hands-on learning.
                        </p>
                        <br />
                        <p
                            ref={(el) => textRef.current[2] = el}
                            className="text-xl text-gray-600 max-w-2xl opacity-0 translate-y-5"
                        >
                            We offer guidance through mentorship programs, hackathons, and workshops
                            to help students succeed in the tech industry.
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                        </p>
                    </div>

                    {/* Image Section */}
<<<<<<< HEAD
                    <div className=" w-72 md:w-1/2 flex justify-center">
                        <img
                            src="/assets/img/about-img/about.svg"
                            alt="Developer Community"
                            className="w-full max-w-md md:max-w-lg rounded-lg mb-20 md:mb-0"
=======
                    <div className="md:w-1/2 flex justify-center relative">
                        <img
                            ref={imageRef}
                            src="/assets/img/about-img/about.svg"
                            alt="Developer Community"
                            className="w-full max-w-md md:max-w-lg rounded-lg"
                        />
                    </div>

                    {/* Floating & Rotating Icons */}
                    <div className="absolute top-10 left-10 hidden md:block">
                        <CodeIcon
                            ref={(el) => floatingIconsRef.current[0] = el}
                            size={40}
                            className="text-blue-500"
                        />
                    </div>
                    <div className="absolute bottom-16 right-16 hidden md:block">
                        <LaptopIcon
                            ref={(el) => floatingIconsRef.current[1] = el}
                            size={40}
                            className="text-green-500"
                        />
                    </div>
                    <div className="absolute top-1/2 left-1/3 hidden md:block">
                        <UsersIcon
                            ref={(el) => floatingIconsRef.current[2] = el}
                            size={40}
                            className="text-purple-500"
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
                        />
                    </div>
                </div>
            </header>
<<<<<<< HEAD

=======
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
            <WhyJoinSection />
            <MissionSection />
        </div>
    );
};
<<<<<<< HEAD

=======
>>>>>>> 76815532f334497bdcc5bb589651b1f08b3e938a
export default AboutComp;