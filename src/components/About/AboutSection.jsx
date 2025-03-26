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

const WhyJoinSection = () => {
    const sectionRef = useRef(null);
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
        const benefits = benefitsRef.current;

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
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Staggered animation for benefits
        benefits.forEach((benefit, index) => {
            gsap.fromTo(
                benefit,
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.7,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white py-16 px-4"
        >
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Why <span className="text-indigo-600">Join</span> Us?
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
                            className="bg-gray-50 rounded-2xl p-6 
                border border-gray-100 
                hover:shadow-xl 
                transition-all duration-300 
                transform hover:-translate-y-2 
                group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="mr-4 bg-white p-3 rounded-full shadow-md">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {benefit.title}
                                </h3>
                            </div>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MissionSection = () => {
    const sectionRef = useRef(null);
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
        const stats = statsRef.current;

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
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 50
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    delay: index * 0.3,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        bg-size-200 text-white py-16 px-4"
        >
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-extrabold mb-8">
                    Our Impact in Numbers
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            ref={el => statsRef.current[index] = el}
                            className="bg-white/10 backdrop-blur-sm 
                rounded-2xl p-6 
                hover:bg-white/20 
                transition-all duration-300"
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

const AboutComp = () => {
    return (
        <div className="bg-gray-50">
            <header className="bg-white py-16 mt-10">
                <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">

                    {/* Text Section */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            About <span className="text-indigo-600">TIT Developer Community</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            A student-led initiative bridging the gap between juniors and seniors through free mentorship and hands-on learning.
                        </p>
                        <br />
                        <p className="text-xl text-gray-600 max-w-2xl">
                            <b className="text-indigo-600">Our mission:</b> Empower students with real-world knowledge, industry insights, and hands-on learning.
                        </p>
                        <br />
                        <p className="text-xl text-gray-600 max-w-2xl">
                            We offer guidance through mentorship programs, hackathons, and workshops to help students succeed in the tech industry.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/assets/img/about-img/about.svg"
                            alt="Developer Community"
                            className="w-full max-w-md md:max-w-lg rounded-lg"
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