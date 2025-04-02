const students = [
    {
        id: 1,
        name: "Sarthak Kumar",
        enrollmentNumber: "0191CS231234",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436544/Sarthak-Kumar_fpzqde.jpg",
        skills: ["Web Dev"],
        review: "Sarthak is an exceptional web developer with incredible attention to detail. His projects are always well-structured and he has a natural talent for creating intuitive user interfaces."
    },
    {
        id: 2,
        name: "Mohd Meraaz",
        enrollmentNumber: "0191AL221090",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436557/Mohd-Meraaz_r9nh6n.jpg",
        skills: ["Cyber", "Android"],
        review: "Meraaz demonstrates exceptional expertise in both cybersecurity and Android development. His analytical approach to problem-solving sets him apart from his peers."
    },
    {
        id: 3,
        name: "Siddharth Kumar",
        enrollmentNumber: "0192CS231193",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436547/Siddharth-Kumar_tuxfyc.jpg",
        skills: ["Android"],
        review: "Siddharth has shown remarkable growth in Android development. His applications are reliable, user-friendly, and demonstrate a deep understanding of mobile platform capabilities."
    },
    {
        id: 4,
        name: "Aryan Sharma",
        enrollmentNumber: "0192CS231051",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436536/Aryan_llmi2k.jpg",
        skills: ["Cyber", "Android"],
        review: "Aryan combines cybersecurity knowledge with Android expertise in a way that creates exceptionally secure applications. His dedication to learning new security techniques is impressive."
    },
    {
        id: 5,
        name: "Nikhil Kumar Gupta",
        enrollmentNumber: "0191CS231171",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436542/Nikhil-Kumar-gupta_aqtqlx.jpg",
        skills: ["ML", "Cyber"],
        review: "Nikhil has a unique ability to integrate machine learning concepts with cybersecurity measures. His innovative approach to solving complex problems makes him a standout student."
    },
    {
        id: 6,
        name: "Rishabh Raj",
        enrollmentNumber: "0111T231100",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436543/Rishabh-Raj_ti68wc.jpg",
        skills: ["Web Dev"],
        review: "Rishabh consistently delivers well-crafted web solutions with clean code. His communication skills and ability to work in teams make him an asset to any project."
    },
    {
        id: 7,
        name: "Naman Kumar",
        enrollmentNumber: "0191CS231137",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436552/Naman-Kumar_bmlngv.jpg",
        skills: ["Web Dev"],
        review: "Naman shows extraordinary creativity in his web development projects. He has a keen eye for design alongside strong technical implementation skills."
    },
    {
        id: 8,
        name: "Rohit Tiwari",
        enrollmentNumber: "0111CS231111",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436543/Rohit-Tiwari_pwhjkt.jpg",
        skills: ["ML", "Web Dev"],
        review: "Rohit brilliantly combines machine learning with web development to create intelligent web applications. His analytical mindset and technical skills are truly impressive."
    },
    {
        id: 9,
        name: "Om Prakash Mehta",
        enrollmentNumber: "0191CS231177",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436542/Om-Prakash_si22kt.png",
        skills: ["Cyber"],
        review: "Om Prakash demonstrates exceptional understanding of cybersecurity principles. His thorough approach to security auditing and threat detection is commendable."
    },
    {
        id: 10,
        name: "Shashank Kumar",
        enrollmentNumber: "0111AL231244",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436546/Shashank-Agrawal_ohm4kc.jpg",
        skills: ["Web Dev"],
        review: "Shashank creates elegant web solutions with remarkable efficiency. His ability to quickly learn new frameworks and implement them effectively is outstanding."
    },
    {
        id: 11,
        name: "Anikesh Sharma",
        enrollmentNumber: "0191CS231044",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436540/Anikesh-Sharma_otngh4.png",
        skills: ["ML"],
        review: "Anikesh has a natural talent for machine learning concepts. His projects demonstrate sophisticated understanding of algorithms and data processing techniques."
    },
    {
        id: 12,
        name: "Sheetal Kawadkar",
        enrollmentNumber: "0191AL221162",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436547/Sheetal-Kawadkar_vyrj80.jpg",
        skills: ["Web Dev"],
        review: "Sheetal consistently delivers high-quality web applications. Her dedication to accessibility and responsive design principles sets her work apart from others."
    },
    {
        id: 13,
        name: "Dipu Kumar",
        enrollmentNumber: "0191CS231111",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436540/Dipu-Kumar_aoq859.png",
        skills: ["Cyber", "Android"],
        review: "Dipu excels in both cybersecurity and Android development. His applications demonstrate a keen awareness of security principles integrated with excellent user experience."
    },
    {
        id: 14,
        name: "Shaloni Mishra",
        enrollmentNumber: "0191AL221160",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436546/shaloni-mishra_irpldl.jpg",
        skills: ["ML", "Web Dev"],
        review: "Shaloni brilliantly combines machine learning principles with web development. Her innovative approach to projects consistently results in intelligent and user-friendly applications."
    },
    {
        id: 15,
        name: "Aditi Gupta",
        enrollmentNumber: "0192CS221010",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436534/Aditi-Gupta_y1jaw5.jpg",
        skills: ["Cyber", "Android"],
        review: "Aditi demonstrates exceptional proficiency in cybersecurity and Android development. Her thorough approach to secure coding practices makes her applications both robust and reliable."
    },
    {
        id: 16,
        name: "Neetesh Chaurasia",
        enrollmentNumber: "0111A231075",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436541/Neetesh-Chaurasia_v7slff.jpg",
        skills: ["Web Dev"],
        review: "Neetesh has an impressive ability to create elegant and efficient web solutions. His keen eye for design combined with strong technical skills results in exceptional web applications."
    },
    {
        id: 17,
        name: "Prince Kumar",
        enrollmentNumber: "0191CS231198",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436543/Prince-Kumar_ibthcw.jpg",
        skills: ["Web Dev"],
        review: "Prince consistently delivers high-quality code with excellent documentation. His methodical approach to web development results in maintainable and scalable applications."
    },
    {
        id: 18,
        name: "Shivam Kumar Tiwari",
        enrollmentNumber: "0111CS231132",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436547/Shivam-Tiwari_b629wk.jpg",
        skills: ["ML", "Web Dev", "Cyber"],
        review: "Shivam excels in multiple domains, bringing together machine learning, web development, and cybersecurity in innovative ways. His versatility and depth of knowledge are truly exceptional."
    },
    {
        id: 19,
        name: "Harshit Anand",
        enrollmentNumber: "0191CS221090",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436554/Harshit-Anandd_epabbj.jpg",
        skills: ["Web Dev", "Cyber", "Android"],
        review: "Harshit demonstrates mastery across web development, cybersecurity, and Android programming. His ability to create comprehensive, secure multi-platform solutions is remarkable."
    },
    {
        id: 20,
        name: "Akash Kumar",
        enrollmentNumber: "0191CS231029",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436535/Akash-Kumar_zoq1sk.jpg",
        skills: ["Cyber"],
        review: "Akash shows exceptional understanding of cybersecurity principles. His analytical approach to vulnerability assessment and penetration testing demonstrates advanced expertise."
    },
    {
        id: 21,
        name: "Ananya Gupta",
        enrollmentNumber: "0191AL221019",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436535/Ananya-Gupta_vdc2dn.jpg",
        skills: ["Web Dev"],
        review: "Ananya creates elegant web solutions with remarkable attention to user experience. Her projects demonstrate both technical excellence and creative innovation."
    },
    {
        id: 22,
        name: "Yashraj Chouhan",
        enrollmentNumber: "0191AL221204",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436548/Yashraj-Chouhan_sk01zl.png",
        skills: ["Cyber"],
        review: "Yashraj has an impressive grasp of cybersecurity concepts and their practical applications. His methodical approach to security testing and risk assessment is outstanding."
    },
    {
        id: 23,
        name: "Sejal Tiwari",
        enrollmentNumber: "1091CS231241",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436546/Sejal-Tiwari_xfhgyr.png",
        skills: ["ML", "Web Dev", "Cyber", "Android"],
        review: "Sejal demonstrates extraordinary versatility across multiple domains. Her ability to integrate machine learning, web development, cybersecurity, and Android programming is truly exceptional."
    },
    {
        id: 24,
        name: "Aman Mishra",
        enrollmentNumber: "0191CS231034",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436540/Aman-Mishra_uougsv.jpg",
        skills: ["ML"],
        review: "Aman shows remarkable aptitude for machine learning algorithms and their applications. His projects demonstrate sophisticated understanding of data analysis and predictive modeling."
    },
    {
        id: 25,
        name: "Prakhar Shrivastava",
        enrollmentNumber: "0191CS231189",
        program: "Web Development, 2nd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436545/Prakhar-Shrivastava_nv2qru.jpg",
        skills: ["ML", "Web Dev", "Cyber"],
        review: "Prakhar brilliantly combines machine learning techniques with web development and cybersecurity. His holistic approach to technology creates innovative and secure solutions."
    },
    {
        id: 26,
        name: "Deepika Deshmukh",
        enrollmentNumber: "0192AL221028",
        program: "Web Development, 3rd Year",
        image: "https://res.cloudinary.com/dltyctci9/image/upload/v1743436537/Deepika-Deshmukh_pddfvy.jpg",
        skills: ["ML", "Web Dev"],
        review: "Deepika excels at integrating machine learning capabilities into web applications. Her projects demonstrate both technical sophistication and practical usability."
    }
];

export default students;