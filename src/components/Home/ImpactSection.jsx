import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    Code,
    Target,
    Monitor,
    ShieldCheck,
    Users,
    BookOpen
} from 'lucide-react';


const ImpactSection = () => {
    const impactRef = useRef(null);

    useEffect(() => {
        const cards = impactRef.current.children;

        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 0,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.3,
                duration: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: impactRef.current,
                    start: "top 80%", // Triggers when 80% of the section is in view
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    const impactStats = [
        {
            icon: <BookOpen className="text-blue-500 w-12 h-12" />,
            stat: "90%+ ATS-Friendly Resumes",
            description: "Helping students stand out in job applications"
        },
        {
            icon: <Code className="text-green-500 w-12 h-12" />,
            stat: "Versatile Tech Domains",
            description: "From AI to Cybersecurity, we've got it all!"
        },
        {
            icon: <Target className="text-purple-500 w-12 h-12" />,
            stat: "15+ ML Students",
            description: "Building AI-powered solutions"
        },
        {
            icon: <Monitor className="text-indigo-500 w-12 h-12" />,
            stat: "20+ App Developers",
            description: "Shaping next-gen mobile innovators"
        },
        {
            icon: <Users className="text-teal-500 w-12 h-12" />,
            stat: "15+ Web Developers",
            description: "Crafting sleek & responsive websites"
        },
        {
            icon: <ShieldCheck className="text-red-500 w-12 h-12" />,
            stat: "30+ Cybersecurity Enthusiasts",
            description: "Strengthening digital defense skills"
        }
    ];

    return (
        <div className="py-10 mt-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
                    Our <span className="text-indigo-600">Impact</span> by the Numbers
                </h2>

                <div
                    ref={impactRef}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {impactStats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-700 p-6 rounded-xl text-center 
                         transform transition-all duration-300 
                         hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
                                {item.stat}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImpactSection;