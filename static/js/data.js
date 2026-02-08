// Portfolio Data
const portfolioData = {
    about: {
        intro: "I'm Priyanshu Dixit, a passionate technologist pursuing my BCA (graduating Aug 2026).",
        focus: "I specialize in Artificial Intelligence, Machine Learning, and Full-Stack Development.",
        passion: "I love building intelligent systems that solve real-world problems."
    },

    skills: {
        "Languages": ["Python", "JavaScript", "HTML5", "CSS3"],
        "Frameworks": ["Django", "Flask"],
        "AI/ML": ["Machine Learning", "Computer Vision", "Geospatial Analysis"],
        "Databases": ["MySQL", "SQLite3"],
        "Other": ["IoT & Hardware", "Sensor Systems", "Git/GitHub"]
    },

    projects: [
        {
            title: "🔒 Intruder Detection System",
            description: "AI-powered security system using computer vision and IoT sensors for real-time intruder detection and logging.",
            tech: ["Python", "OpenCV", "IoT", "Sensors"]
        },
        {
            title: "💪 Gym Management App",
            description: "Full-stack application for gym owners to manage members, workouts, and subscriptions.",
            tech: ["Web Stack", "Database"],
            link: "https://gym-management-4k07.onrender.com/"
        },
        {
            title: "🌊 Flood Prediction System",
            description: "ML-based system analyzing geospatial data to predict flood-prone regions.",
            tech: ["Django", "ML", "Geospatial"]
        }
    ],

    experience: [
        {
            role: "Intern",
            company: "Remote Sensing Application Centre (RSAC), UP",
            period: "May 2025 - June 2025",
            description: "Developed a Flood Prediction System using Django and Machine Learning. Analyzed large-scale geospatial data to classify flooded areas."
        },
        {
            role: "Technical Trainee",
            company: "NIELIT",
            period: "May 2024 - June 2024",
            description: "Completed intensive training in modern computing technologies."
        }
    ],

    education: {
        degree: "Bachelor of Computer Applications (BCA)",
        graduation: "Expected August 2026",
        focus: "Computer Applications, Software Development & Data Science"
    },

    certifications: [
        {
            name: "Internship Certificate - RSAC",
            image: "/static/images/rsac_certificate.jpeg",
            fallbackImages: ["/static/images/rsac_certificate.jpg", "/static/images/rsac_certificate.png"],
            description: "Certificate from Remote Sensing Application Centre"
        },
        {
            name: "Training Certificate - NIELIT",
            image: "/static/images/nielit_certificate.jpeg",
            fallbackImages: ["/static/images/nielit_certificate.jpg", "/static/images/nielit_certificate.png"],
            description: "Certificate from NIELIT Training Program"
        }
    ],

    resume: {
        file: "/static/images/resume.pdf",
        description: "Download my complete resume"
    },

    contact: {
        email: "priyanshudixit768@gmail.com",
        linkedin: "https://www.linkedin.com/in/priyanshu-dixit-46aa932b5",
        github: "https://github.com/Priyanshu-dixit5"
    }
};

// Keyword to Intent Mapping
const intentMap = {
    about: ["about", "who", "yourself", "introduce", "tell me", "bio"],
    skills: ["skill", "tech", "stack", "know", "can you", "technologies", "language"],
    projects: ["project", "work", "built", "portfolio", "made", "create", "app"],
    experience: ["experience", "job", "work", "intern", "rsac", "nielit", "professional"],
    education: ["education", "study", "degree", "bca", "college", "school", "university", "graduat"],
    certifications: ["certificate", "certification", "cert", "award"],
    resume: ["resume", "cv", "download", "pdf"],
    contact: ["contact", "email", "reach", "connect", "hire", "message", "mail"]
};
