import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { LinkedinIcon, AwardIcon, User } from 'lucide-react';

const mentors = [
    {
        name: "Ankit Kumar",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436100/Ankit-Kumar_dp4slh.jpg",
        expertise: "Full Stack Development",
        linkedin: "https://www.linkedin.com/in/ankitkumar0905/",
        description: "Tech innovator bridging learning gaps with cutting-edge solutions",
        achievements: [
            "Lead Developer at Tech Startup",
            "ML Consultant"
        ]
    },
    {
        name: "Anand Soni",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436100/Anand-Soni_vlikvb.jpg",
        expertise: "Machine Learning",
        linkedin: "https://www.linkedin.com/in/anandsoni992/",
        description: "AI researcher transforming complex problems into intelligent solutions",
        achievements: [
            "Published ML Research Papers",
            "AI Competition Winner"
        ]
    },
    {
        name: "Ankit Patel",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436100/Ankit-Patel_z3ngki.jpg",
        expertise: "Cybersecurity",
        linkedin: "https://www.linkedin.com/in/ankit-patel-563b9927b/",
        description: "Cybersecurity expert fortifying digital landscapes with innovative strategies",
        achievements: [
            "Certified Ethical Hacker",
            "Security Consultant"
        ]
    }
];

const MentorCard = ({ mentor }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        gsap.set(card, {
            perspective: 600,
            transformStyle: 'preserve-3d'
        });

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.2,
                rotationX: 5,
                rotationY: -5,
                translateY: -10,
                scale: 1.03,
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                ease: 'power3.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.1,
                rotationX: 0,
                rotationY: 0,
                translateY: 0,
                scale: 1,
                boxShadow: '0 0 0',
                ease: 'power3.out'
            });
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6
        transition-all duration-300 
        transform hover:-translate-y-2
        flex flex-col"
        >
            <div className="absolute top-0 right-0 m-4 z-10">
                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon
                        className="text-blue-500 hover:text-blue-700 
            transition-colors duration-300"
                        size={32}
                    />
                </a>
            </div>

            <div className="flex flex-col items-center space-y-4 flex-grow">
                <div className="w-32 h-32 rounded-full overflow-hidden 
          border-4 border-white dark:border-gray-500 ">
                    <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{mentor.name}</h3>
                    <p className="text-indigo-500 dark:text-indigo-600 font-semibold">{mentor.expertise}</p>
                    <p className="text-gray-600 mt-2 text-sm px-2 dark:text-gray-300">{mentor.description}</p>
                </div>

                <div className="mt-4 w-full">
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-center">
                            <AwardIcon size={16} className="mr-2 text-amber-500" />
                            Key Achievements
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 text-center space-y-1">
                            {mentor.achievements.map((achievement, index) => (
                                <li key={index} className="bg-gray-50 dark:bg-gray-500 rounded-md px-2 py-1">
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MentorsPage = () => {

    const headRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {
            opacity: 0,
            scale: 0,
            duration: 1.5,
            ease: "bounce.out"

        })
    }, [])





    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div ref={headRef} className="text-center mb-12 mt-10">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-200">
                        Meet Our <span className="text-indigo-600">Expert Mentors</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Industry veterans committed to nurturing the next generation of tech innovators through personalized guidance and real-world insights.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {mentors.map((mentor, index) => (
                        <MentorCard key={index} mentor={mentor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorsPage;