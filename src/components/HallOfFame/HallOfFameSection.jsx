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
                ]
            },
            {
                name: 'Aryan Sharma',
                year: '3rd Year',
                achievements: [
                    '10+ projects',
                    '5+ hackathons',
                    'Play Store deployments'
                ]
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
                ]
            },
            {
                name: 'Deepika Deshmukh',
                year: '3rd Year',
                achievements: [
                    '10+ projects',
                    '5+ hackathons'
                ]
            }
        ]
    },
    {
        domain: 'Web Development',
        students: [
            {
                name: 'Prakhar',
                year: '2nd Year',
                achievements: [
                    '10+ projects',
                    'SIH 2024 Finalist'
                ]
            },
            {
                name: 'Naman Kumar',
                year: '3rd Year',
                achievements: [
                    '5+ projects',
                    'Secured internship'
                ]
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
                ]
            },
            {
                name: 'Mohd Meraaz',
                year: '3rd Year',
                achievements: [
                    'Successfully completed cybersecurity training'
                ]
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
                y: 50,
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
            className="bg-white rounded-2xl p-6
        border border-gray-100 
        hover:shadow-xl 
        transition-all duration-300 
        transform hover:-translate-y-2"
        >
            <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-100 p-3 rounded-full">
                    {DOMAIN_ICONS[domain]}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {student.year}
                    </p>
                </div>
            </div>
            <div className="space-y-2">
                {student.achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="flex items-center text-gray-600"
                    >
                        <AwardIcon size={16} className="mr-2 text-amber-500" />
                        <span className="text-sm">{achievement}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HallOfFameSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const sectionRef = useRef(null);

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
        const section = sectionRef.current;

        gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <header className="text-center md:text-left mb-12 mt-10">
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
                        {/* Title & Description */}
                        <div className="md:w-2/3 text-center md:text-left">
                            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 flex items-center">
                                Hall of <span className="text-indigo-600 ml-2">Fame</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl">
                                Celebrating the exceptional achievements of our talented students.
                            </p>
                        </div>

                        {/* Right-side Image */}
                        <div className="w-48 h-48 mt-6 md:mt-0">
                            <img
                                src="/assets/img/fame-img/fame.svg" // Change to your image path
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
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Sections */}
                <div ref={sectionRef}>
                    {filteredData.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                {DOMAIN_ICONS[section.domain]}
                                <span className="ml-3">{section.domain}</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
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