import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    CodeIcon,
    DatabaseIcon,
    LaptopIcon,
    ShieldIcon,
    AwardIcon
} from 'lucide-react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Domain Icons Mapping
const DOMAIN_ICONS = {
    'Android Development': <CodeIcon className="text-green-500" />,
    'Machine Learning': <DatabaseIcon className="text-purple-500" />,
    'Web Development': <LaptopIcon className="text-blue-500" />,
    'Cybersecurity': <ShieldIcon className="text-red-500" />
};

const hallOfFameData = [
    {
        domain: 'Android Development',
        students: [
            {
                name: 'Dipu Kumar',
                year: '2nd Year',
                achievements: [
                    '5+ projects',
                    '4+ certifications'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436540/Dipu-Kumar_aoq859.png'
            },
            {
                name: 'Aryan Sharma',
                year: '3rd Year',
                achievements: [
                    '10+ projects',
                    '5+ hackathons',
                    'Play Store deployments'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436536/Aryan_llmi2k.jpg'
            }
        ]
    },
    {
        domain: 'Machine Learning',
        students: [
            {
                name: 'Aman Mishra',
                year: '2nd Year',
                achievements: [
                    '5+ major projects',
                    'SIH 2024 Finalist'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436540/Aman-Mishra_uougsv.jpg'
            },
            {
                name: 'Deepika Deshmukh',
                year: '3rd Year',
                achievements: [
                    '10+ projects',
                    '5+ hackathons'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436537/Deepika-Deshmukh_pddfvy.jpg'
            }
        ]
    },
    {
        domain: 'Web Development',
        students: [
            {
                name: 'Prakhar Shrivastava',
                year: '2nd Year',
                achievements: [
                    '10+ projects',
                    'SIH 2024 Finalist'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436545/Prakhar-Shrivastava_nv2qru.jpg'
            },
            {
                name: 'Naman Kumar',
                year: '3rd Year',
                achievements: [
                    '5+ projects',
                    'Secured internship'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436552/Naman-Kumar_bmlngv.jpg'
            }
        ]
    },
    {
        domain: 'Cybersecurity',
        students: [
            {
                name: 'Akash Kumar',
                year: '2nd Year',
                achievements: [
                    '3+ projects',
                    'ATS-optimized resume'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436535/Akash-Kumar_zoq1sk.jpg'
            },
            {
                name: 'Mohd Meraaz',
                year: '3rd Year',
                achievements: [
                    'Successfully completed cybersecurity training'
                ],
                image: 'https://res.cloudinary.com/dltyctci9/image/upload/v1743436557/Mohd-Meraaz_r9nh6n.jpg'
            }
        ]
    }
];

const StudentCard = ({ student, domain }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        gsap.fromTo(
            card,
            {
                opacity: 0,
                y: 0,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <div
            ref={cardRef}
            className="bg-white dark:bg-gray-700 dark:hover:bg-gray-800 rounded-2xl p-4 sm:p-6
            border border-gray-100 dark:border-none
            hover:shadow-xl dark:shadow-gray-950
            transition-all duration-300 
            transform hover:-translate-y-2 
            flex items-center justify-between"
        >
            <div className="w-32 sm:w-40 h-32 sm:h-40 mr-4 sm:mr-6">
                <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover rounded-xl border border-gray-200 dark:border-none shadow-md"
                />
            </div>
            <div className="flex-grow">
                <div className="flex items-center mb-2 sm:mb-4">
                    <div className="mr-2 sm:mr-4 bg-gray-100 dark:bg-gray-600 p-2 sm:p-3 rounded-full">
                        {DOMAIN_ICONS[domain]}
                    </div>
                    <div>
                        <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-300">
                            {student.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {student.year}
                        </p>
                    </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                    {student.achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="flex items-center text-gray-600 dark:text-gray-400"
                        >
                            <AwardIcon size={14} className="mr-2 text-amber-500" />
                            <span className="text-xs sm:text-sm">{achievement}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const HallOfFameSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const imageRef = useRef(null);

    const filterCategories = [
        'All',
        'Android Development',
        'Machine Learning',
        'Web Development',
        'Cybersecurity'
    ];

    const filteredData = activeFilter === 'All'
        ? hallOfFameData
        : hallOfFameData.filter(section => section.domain === activeFilter);

    useEffect(() => {
        // Create a GSAP timeline for the initial page load animation
        const tl = gsap.timeline();

        // Animate heading
        tl.fromTo(
            headingRef.current,
            {
                scale: 0,
                opacity: 0,
                y: 50
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }
        )
            // Animate image
            .fromTo(
                imageRef.current,
                {
                    scale: 0,
                    opacity: 0,
                    rotation: -20
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                },
                '-=0.4' // slightly overlap with heading animation
            );

        // Section scroll animation
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <header className="text-center md:text-left mb-12 mt-10">
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
                        {/* Title & Description */}
                        <div ref={headingRef} className="md:w-2/3 text-center md:text-left origin-center">
                            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-200 mb-4 flex items-center justify-center md:justify-start">
                                Hall of <span className="text-indigo-600 ml-2">Fame</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl text-center md:text-left">
                                Celebrating the exceptional achievements of our talented students.
                            </p>
                        </div>

                        {/* Right-side Image */}
                        <div ref={imageRef} className="w-48 h-48 mt-6 md:mt-0 origin-center">
                            <img
                                src="https://res.cloudinary.com/dltyctci9/image/upload/v1743436977/fame_ck3mru.svg"
                                alt="Hall of Fame"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filterCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold 
                            transition-all duration-300 
                            ${activeFilter === category
                                    ? "bg-indigo-600 dark:bg-indigo-800 text-white"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Sections */}
                <div ref={sectionRef} className="px-2 sm:px-4">
                    {filteredData.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center justify-center md:justify-start">
                                {DOMAIN_ICONS[section.domain]}
                                <span className="ml-3">{section.domain}</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 sm:px-0">
                                {section.students.map((student, studentIndex) => (
                                    <StudentCard key={studentIndex} student={student} domain={section.domain} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HallOfFameSection;