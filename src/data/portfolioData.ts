import type { 
  PersonalInfo, 
  Project, 
  SkillCategory, 
  ExperienceItem, 
  ResearchInterest, 
  ResearchPublication, 
  EducationItem, 
  AchievementItem,
  CertificationItem
} from '../types';

export const personalInfo: PersonalInfo = {
  name: "Yashwanth M S",
  initials: "YMS",
  role: "Computer Science Student | Aspiring Software Developer",
  headline: "Building Intelligent Solutions Through Code.",
  institution: "Malnad College of Engineering, Hassan, Karnataka, India",
  graduationYear: 2027,
  cgpa: "9.09",
  primaryLanguage: "Java",
  availabilityStatus: "Open to Internships & Research Collaborations (Summer 2025/2026)",
  location: "Hassan, Karnataka, India",
  objective: "Aspiring Software Engineer with a strong foundation in Data Structures and Algorithms (DSA) and hands-on experience in Java, C++, C, SQL, and web development. Passionate about building efficient, scalable solutions and eager to learn, contribute, and grow in an innovative real-world environment.",
  spokenLanguages: ["English", "Kannada (Native)"],
  certifications: ["Python Certification", "Web Development Certification", "Figma Certification"],
  bioSummary: "Aspiring Software Engineer with a strong foundation in Data Structures and Algorithms (DSA) and hands-on experience in Java, C++, C, SQL, and web development.",
  extendedBio: [
    "I'm a Computer Science Engineering student at Malnad College of Engineering, Hassan, with a strong foundation in Data Structures and Algorithms (DSA) and hands-on experience in Java, C++, C, SQL, and modern full-stack development.",
    "My goal is to combine robust algorithmic problem-solving with scalable software architectures to engineer real-world systems. My academic journey is anchored by disciplined computer science fundamentals, achieving a 9.09 CGPA while actively leading technical chapters, hackathons, and innovative systems research."
  ],
  socialLinks: {
    github: "https://github.com/yashums-05", // [EDITABLE]: Replace with your GitHub handle
    linkedin: "https://www.linkedin.com/in/yashwanthms05", // [EDITABLE]: Replace with your LinkedIn profile
    email: "msyashwanth432005@gmail.com", // [EDITABLE]: Replace with your email address
    twitter: "https://x.com/your-handle", // [EDITABLE]: Optional handle
  },
  contactEmail: "msyashwanth432005@gmail.com",
  formResponseEmail: "yashwanthms.mce@gmail.com",
  web3FormsAccessKey: "15023768-c23a-404f-a2cd-541821127fb7",
  emailjs: {
    serviceId: "service_35y3po4",
    templateInquiryId: "template_zjyfqc4",
    publicKey: "J_cSoluRlSaQxICr2",
  },
  avatarUrl: "/images/yashwanth-portrait.jpg",
  campusPhotoUrl: "/images/yashwanth-campus.jpg",
  galleryPhotos: [
    {
      id: "portrait",
      url: "/images/yashwanth-portrait.jpg",
      title: "Engineering Portrait",
      caption: "B.E. Computer Science Engineering & Java Systems Developer",
      tag: "Main Profile"
    },
    {
      id: "conference",
      url: "/images/yashwanth-conference.jpg",
      title: "ICTIEE & IUCEE Technical Symposium",
      caption: "Official Participant Badge & Malnad College of Engineering Delegate",
      tag: "Conference & Chapter"
    },
    {
      id: "campus",
      url: "/images/yashwanth-campus.jpg",
      title: "MCE Campus Life",
      caption: "Student Chapter Leadership, Tech Operations & Team Coordination",
      tag: "Campus Life"
    },
    {
      id: "outdoor",
      url: "/images/yashwanth-outdoor.jpg",
      title: "Builder & Problem Solver",
      caption: "Transforming ideas into resilient software architectures",
      tag: "Team & Community"
    }
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Core languages used for systems programming, data structures, and algorithmic logic.",
    skills: [
      { name: "Java", level: "Primary Language", isPrimary: true },
      { name: "C++", level: "OOP & Competitive Programming", isPrimary: true },
      { name: "C", level: "Systems & Memory Basics" },
      { name: "SQL", level: "Relational Queries & Schemas", isPrimary: true },
      { name: "Python", level: "AI / ML & Scripting" },
    ]
  },
  {
    category: "Web & Enterprise Development",
    description: "Full-stack architectures, REST APIs, and backend frameworks.",
    skills: [
      { name: "Spring Boot", level: "Enterprise Backend", isPrimary: true },
      { name: "Node.js", level: "JavaScript Runtime", isPrimary: true },
      { name: "Django", level: "Python Framework" },
      { name: "PHP", level: "Server-side Web Portal" },
      { name: "HTML", level: "Semantic Markup" },
      { name: "CSS", level: "Modern Styling" },
      { name: "JavaScript", level: "ES6+ Standards", isPrimary: true },
      { name: "REST APIs", level: "API Engineering" },
    ]
  },
  {
    category: "Databases & Storage",
    description: "Relational persistence, query optimization, and structured schemas.",
    skills: [
      { name: "MySQL", level: "Relational Schemas", isPrimary: true },
      { name: "PostgreSQL", level: "Object-Relational DBMS" },
      { name: "MongoDB", level: "Document Store" },
      { name: "SQLite", level: "Embedded Database" },
    ]
  },
  {
    category: "Core Computer Science & AI/ML",
    description: "Algorithmic thinking, optimization models, and predictive pipelines.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Core Problem Solving", isPrimary: true },
      { name: "Real-World Problem Solving", level: "Applied Logic", isPrimary: true },
      { name: "Deep Reinforcement Learning (PPO)", level: "Dynamic Control" },
      { name: "LSTM Neural Forecasting", level: "Time Series" },
      { name: "PyTorch & TensorFlow", level: "Model Development" },
      { name: "Sustainable Computing", level: "Green Tech" },
    ]
  },
  {
    category: "Design & Developer Platforms",
    description: "UI/UX wireframing, digital media, version control, and collaboration tools.",
    skills: [
      { name: "Figma (UI/UX)", level: "Interface Design" },
      { name: "Canva", level: "Digital Media & Visuals" },
      { name: "Git & GitHub", level: "Version Control & CI/CD", isPrimary: true },
      { name: "VS Code & IntelliJ IDEA", level: "IDEs", isPrimary: true },
      { name: "Antigravity", level: "Agentic IDE & AI Workflows", isPrimary: true },
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "green-computing-lstm-ppo",
    title: "Energy Optimization for Green Computing",
    tagline: "LSTM Forecasting & PPO Deep Reinforcement Learning",
    description: "Built a closed-loop data center energy optimization system where a two-layer stacked LSTM forecast (power, CPU temperature, cooling) feeds a PPO-based DRL agent that controls server scaling, CPU frequency, cooling mode, and power source.",
    category: "Research & Systems",
    status: "Completed",
    featured: true,
    technologies: ["Python", "PyTorch", "LSTM", "PPO", "REST API", "Web Dashboard"],
    keyFeatures: [
      "Two-layer stacked LSTM forecasting power, CPU temperature, and cooling loads",
      "PPO-based DRL agent controlling server scaling, CPU frequency, and cooling modes",
      "Closed-loop control policy optimizing power sources and thermal thresholds",
      "Real-time monitoring metrics served via backend REST API and interactive web dashboard"
    ],
    metricsOrHighlight: "LSTM reached R² ≈ 0.87 (4.18% MAPE for power) & PPO agent reached estimated PUE of 1.338",
    githubUrl: "https://github.com/yashums-05/datacenter-ppo-lstm",
    liveUrl: "",
    isComingSoon: false
  },
  {
    id: "portable-biofilters",
    title: "Portable and Compatible Biofilters",
    tagline: "Solar-Powered Vehicular PM2.5 Air Filtration Prototype",
    description: "Developed an innovative solar-powered air filtration prototype to capture vehicular PM2.5 emissions using activated carbon and modular multi-layer filters, engineered for urban sustainability, high durability, and practical transit scalability.",
    category: "Research & Systems",
    status: "Active Prototype",
    featured: true,
    technologies: ["Hardware Prototype", "Sustainability", "Solar Power", "Activated Carbon", "Environmental Tech"],
    keyFeatures: [
      "Solar-powered active filtration unit designed for vehicular exhaust integration",
      "Multi-layer filter design utilizing activated carbon to capture hazardous PM2.5 emissions",
      "Engineered with a primary focus on sustainability, durability, and cost efficiency",
      "Designed for scalable deployment and modular maintenance across urban transportation"
    ],
    metricsOrHighlight: "Innovative eco-engineering prototype for vehicular particulate reduction",
    githubUrl: "",
    liveUrl: "",
    isComingSoon: false
  },
  {
    id: "dept-resource-management",
    title: "Department Resource Management",
    tagline: "Centralized Academic Resource Web Application",
    description: "Designed and implemented a centralized full-stack academic web platform to manage departmental course materials with multi-tier role-based access for HOD, faculty, and students, featuring secure uploads, approvals, and categorized query search.",
    category: "Full-Stack & Java",
    status: "Completed",
    featured: true,
    technologies: ["Java", "Spring Boot", "React", "TypeScript", "Tailwind CSS", "REST APIs", "H2 Database"],
    keyFeatures: [
      "Role-based access control (RBAC) customized for HOD, faculty members, and students",
      "Secure file upload and verification workflows with departmental approval lifecycles",
      "Organized course material categorization with fast and efficient query retrieval",
      "High-performance Spring Boot REST API backend paired with React & Vite frontend"
    ],
    metricsOrHighlight: "Secure multi-tier access control and centralized resource dispatch",
    githubUrl: "https://github.com/yashums-05/Department-Resource-Management",
    liveUrl: "",
    isComingSoon: false
  },
  {
    id: "event-management-portal",
    title: "Event Management Portal",
    tagline: "Campus Event Discovery, Team Registrations & Administrative Roster System",
    description: "A modern, responsive web application engineered to streamline campus fests, hackathons, and student club initiatives at Malnad College of Engineering. Provides dedicated role-based workflows for Students, Event Organizers, and Faculty Advisors with solo & team registration lifecycles.",
    category: "Full-Stack & Java",
    status: "Completed",
    featured: true,
    technologies: ["PHP", "MySQL", "MariaDB", "JavaScript", "HTML5", "CSS3", "PDO"],
    keyFeatures: [
      "Role-based authentication workflows for Students, Event Organizers, and Faculty Advisors",
      "Solo and team event registration with captain squad management and teammate USN validation",
      "Organizer event lifecycle management: event creation, dynamic team sizes, and roster supervision",
      "Faculty attendee roster view with real-time department (CSE, AIML, etc.) & academic year filters",
      "One-click participant roster export and printable records for event coordinators"
    ],
    metricsOrHighlight: "Comprehensive campus event management with team USN validation & faculty roster exports",
    githubUrl: "https://github.com/yashums-05/Event-Management-Portal",
    liveUrl: "",
    isComingSoon: false
  },
  {
    id: "railpulse",
    title: "RailPulse",
    tagline: "Smart Complaint Resolution and Train Occupancy Analytics System",
    description: "A full-stack railway intelligence platform integrating passenger grievance redressal with dynamic crowd density analytics. Allows travelers to log complaints with photographic evidence and track resolutions in real-time, while empowering Station Masters and Ticket Examiners (TT) with assigned dashboards and occupancy estimation from booking data.",
    category: "Full-Stack & Java",
    status: "Active Prototype",
    featured: true,
    technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "Data Analytics"],
    keyFeatures: [
      "Role-tailored interfaces for Passengers, Station Masters, Ticket Examiners (TT), and Super Admins",
      "Grievance submission pipeline with photo proof upload and real-time status tracking (Pending/In-Progress/Resolved)",
      "Dynamic passenger crowd density estimation per station and per train based on ticket booking telemetry",
      "Staff resolution workflows enabling TT and Station Masters to upload resolution proof and close issues",
      "PostgreSQL relational schema mapping Trains, Stations, Multi-stop Routes, and Grievance records"
    ],
    metricsOrHighlight: "Three-tier full-stack architecture with PostgreSQL indexing & station/train crowd analytics",
    githubUrl: "https://github.com/yashums-05/Railpulse",
    liveUrl: "",
    isComingSoon: false
  },
  {
    id: "file-sharing-portal",
    title: "File-Sharing Portal",
    tagline: "FileVault — Secure File Upload, Storage & Tokenized Sharing Platform",
    description: "A full-stack web application designed for secure file uploading, storage, and sharing with JWT authentication, role-based access control, drag-and-drop file handling, and tokenized public download links with automated expiry.",
    category: "Full-Stack & Java",
    status: "Completed",
    featured: false,
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Multer", "REST APIs", "Axios"],
    keyFeatures: [
      "JWT-based user authentication and bcrypt password hashing with secure session persistence",
      "Seamless file upload pipeline with drag & drop support powered by Multer disk storage",
      "Flexible file sharing mechanisms via targeted email permissions or tokenized public share links",
      "Real-time file search, metadata tracking, and secure stream downloading"
    ],
    metricsOrHighlight: "End-to-end full-stack file pipeline with JWT authorization and MongoDB indexing",
    githubUrl: "https://github.com/yashums-05/File-sharing-portal",
    liveUrl: "",
    isComingSoon: false
  },
  {
    id: "ai-design-thinking-tutor",
    title: "AI Design Thinking Tutor",
    tagline: "Personalized AI-Powered Learning Platform",
    description: "An AI-powered adaptive learning platform designed to guide engineering students through Design Thinking stages (Empathize, Define, Ideate, and Test), featuring interactive prompt evaluation and immersive spatial augmented reality concepts.",
    category: "AI & Machine Learning",
    status: "Proposed Architecture",
    featured: false,
    technologies: ["Python", "Large Language Models", "Prompt Engineering", "Streamlit", "AR Concepts"],
    keyFeatures: [
      "Step-by-step interactive guidance across Empathize, Define, Ideate, Prototype, and Test phases",
      "Context-aware AI feedback tailored to student problem statements and user personas",
      "Structured brainstorming prompts encouraging divergent and convergent thinking",
      "Conceptual AR integration plan for visual workspace synthesis and 3D spatial ideation"
    ],
    metricsOrHighlight: "Pedagogy-centered AI workflow for human-centric innovation",
    githubUrl: "https://github.com/yashums-05/ai-design-thinking-tutor",
    liveUrl: "",
    isComingSoon: true
  },
  {
    id: "carbon-emission-management",
    title: "EcoTrack — Intelligent Carbon Emission Management",
    tagline: "AI-Powered Carbon Footprint Tracking, Forecasting & Actionable Insights",
    description: "An intelligent platform designed to track, forecast, and reduce organizational carbon footprints. Features multi-scope emission tracking (Scope 1, 2, and 3), predictive emission forecasting, customizable data uploads (CSV and manual), and actionable AI-driven reduction recommendations.",
    category: "AI & Machine Learning",
    status: "Completed",
    featured: false,
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "Radix UI", "Recharts", "Lucide React"],
    keyFeatures: [
      "Multi-scope emissions analytics visualizing Scope 1, Scope 2, and Scope 3 footprints",
      "Flexible data ingestion supporting CSV imports and manual energy, transportation, and waste logs",
      "Predictive emission forecasting evaluating historical trends to model future trajectories",
      "AI-driven decarbonization recommendations prioritized by environmental impact and feasibility",
      "Interactive data visualizations built with Recharts, Radix UI primitives, and modern responsive UI"
    ],
    metricsOrHighlight: "Comprehensive Scope 1-3 analytics, predictive trend forecasting & AI decarbonization roadmaps",
    githubUrl: "https://github.com/yashums-05/Carbon-Emission-Management",
    liveUrl: "",
    isComingSoon: false
  }
];

export const experienceItems: ExperienceItem[] = [
  {
    id: "iucee-internal-affairs",
    title: "Internal Affair",
    organization: "IUCEE EWB–MCE Student Chapter",
    period: "Sep 2026 – Present",
    location: "Malnad College of Engineering, Hassan",
    type: "INTERNAL AFFAIRS",
    statusBadge: "Active Leadership",
    description: [
      "Overseeing internal governance, chapter policies, inter-team communications, and cross-functional coordination across all technical committees.",
      "Facilitating seamless alignment between the core executive board, faculty advisors, and student members.",
      "Leading internal administrative workflows, documentation, and strategic meeting governance for ongoing chapter initiatives."
    ],
    coreCompetencies: [
      "Internal Communications",
      "Organizational Governance",
      "Team Coordination",
      "Strategic Planning",
      "Conflict Resolution",
      "Administrative Leadership"
    ]
  },
  {
    id: "iucee-member",
    title: "Member",
    organization: "IUCEE EWB–MCE Student Chapter",
    period: "Oct 2024 – Present",
    location: "Malnad College of Engineering, Hassan",
    type: "STUDENT CHAPTER",
    statusBadge: "Core Contributor",
    description: [
      "Contributing actively to engineering education, sustainable development initiatives, and community outreach projects under IUCEE & Engineers Without Borders.",
      "Collaborating on technical symposiums, peer mentorship workshops, and student innovation ideathons at Malnad College of Engineering.",
      "Engaging with multidisciplinary engineering student cohorts to drive community-centric technology solutions."
    ],
    coreCompetencies: [
      "Engineering Leadership",
      "Community Outreach",
      "Teamwork",
      "Technical Collaboration",
      "Problem Solving"
    ]
  },
  {
    id: "iucee-event-manager",
    title: "Event Manager",
    organization: "IUCEE EWB–MCE Student Chapter",
    period: "Oct 2025 – Aug 2026",
    location: "Malnad College of Engineering, Hassan",
    type: "EVENT OPERATIONS",
    statusBadge: "Operations Lead",
    description: [
      "Directed planning, end-to-end logistics, scheduling, and execution for major college technical events, hackathons, and ideathons.",
      "Managed participant registrations, venue administration, equipment coordination, and on-ground operations.",
      "Liaised with faculty coordinators, external speakers, volunteers, and technical juries to ensure flawless execution of large-scale initiatives including Avishkar Manthan."
    ],
    coreCompetencies: [
      "Event Operations",
      "Logistics Management",
      "Project Coordination",
      "Team Leadership",
      "Budgeting & Scheduling",
      "Stakeholder Communication"
    ]
  },
  {
    id: "iucee-head-of-digital",
    title: "Head of Digital and Social Media",
    organization: "IUCEE EWB–MCE Student Chapter",
    period: "Jun 2025 – Sep 2025",
    location: "Malnad College of Engineering, Hassan",
    type: "LEADERSHIP & DIGITAL",
    statusBadge: "Media Strategy",
    description: [
      "Spearheaded the chapter's official digital branding, online presence, and digital communication strategy across social platforms.",
      "Designed high-impact digital promotional collateral, brochures, social banners, and event graphics.",
      "Managed digital campaign rollouts, significantly increasing student participation and online community reach."
    ],
    coreCompetencies: [
      "Digital Branding",
      "Social Media Strategy",
      "Visual Design",
      "Content Strategy",
      "Campaign Management",
      "Creative Direction"
    ]
  },
  {
    id: "calmstack-volunteer",
    title: "Volunteer Member",
    organization: "CalmStacks 24-Hour Hackathon, Dept. of CSE, MCE",
    period: "2026",
    location: "MCE Campus, Hassan",
    type: "HACKATHON & EVENTS",
    statusBadge: "Technical Operations",
    description: [
      "Contributed to the planning and execution of CalmStacks, a 24-hour hackathon organized by the Department of Computer Science and Engineering.",
      "Assisted in participant coordination, event logistics, and on-site operations.",
      "Supported technical arrangements, hardware and network setup, and troubleshooting during the hackathon.",
      "Coordinated with organizing teams, participating developer teams, and fellow volunteers to ensure smooth event execution."
    ],
    coreCompetencies: [
      "Hackathon Operations",
      "Technical Coordination",
      "Event Logistics",
      "Problem-Solving",
      "Teamwork",
      "Developer Support"
    ]
  }
];

export const researchInterests: ResearchInterest[] = [
  {
    title: "Explainable AI (XAI)",
    description: "Developing transparent, auditable neural decision models that enable human operators to understand feature importance and attribution in high-stakes domains.",
    tags: ["SHAP", "LIME", "Attention Maps", "Model Interpretability"]
  },
  {
    title: "Adaptive Deep Learning",
    description: "Architectures capable of continuous learning, dynamic pruning, and domain adaptation without catastrophic forgetting under non-stationary distributions.",
    tags: ["Continual Learning", "Meta-Learning", "Dynamic Weights"]
  },
  {
    title: "Multi-Agent Systems",
    description: "Investigating emergent coordination protocols, consensus mechanisms, and communication topology among autonomous AI agents solving distributed tasks.",
    tags: ["Agent Swarms", "Game Theory", "Distributed Decision Making"]
  },
  {
    title: "Sustainable Computing",
    description: "Algorithmic strategies and hardware-aware scheduling to minimize energy footprints, thermal dissipation, and carbon emissions in modern compute infrastructure.",
    tags: ["Green Computing", "Resource Scheduling", "Carbon-Aware Systems"]
  },
  {
    title: "Reinforcement Learning",
    description: "Policy gradient algorithms, actor-critic frameworks, and exploration strategies for optimal resource dispatch and real-time control systems.",
    tags: ["PPO", "DQN", "Continuous Control", "Markov Decision Processes"]
  },
  {
    title: "Big Data Systems",
    description: "Architectures for high-throughput streaming analytics, distributed storage layers, and resilient schema pipelines for data-intensive applications.",
    tags: ["Stream Processing", "Distributed Systems", "Fault Tolerance"]
  }
];

export const researchPublications: ResearchPublication[] = [
  {
    id: "pub-datacenter-ppo",
    title: "Intelligent Resource Scheduling in Green Data Centers via Deep Reinforcement Learning and Predictive Sequential Modeling",
    authors: ["Yashwanth M S", "Faculty Mentors & Collaborators"],
    venueOrContext: "Targeting International Conferences on Cloud & Sustainable Computing",
    year: "2025",
    status: "Research in Progress",
    abstract: "Investigating the synthesis of LSTM-based load horizon forecasting with Proximal Policy Optimization (PPO) reinforcement learning agents. The study explores power consolidation policies under dynamic web traffic loads to reduce overall energy dissipation while preserving Service Level Agreement (SLA) latency bounds.",
    keywords: ["Sustainable Computing", "Reinforcement Learning", "LSTM", "Resource Optimization", "Data Centers"],
    doi: "",
    paperLink: ""
  },
  {
    id: "pub-xai-agriculture",
    title: "Explainable Deep Vision Architectures for Multi-Stage Crop Lesion Severity Estimation",
    authors: ["Yashwanth M S", "Research Collaborators"],
    venueOrContext: "Academic Research Working Paper",
    year: "2024 - 2025",
    status: "Concept Proposal",
    abstract: "Proposed framework addressing the lack of diagnostic transparency in agricultural computer vision. Integrates Class Activation Mapping (Grad-CAM) alongside severity grading to present agronomists with visually verifiable lesion masks for reliable crop management.",
    keywords: ["Explainable AI", "Computer Vision", "Agricultural Tech", "Convolutional Neural Networks"],
    doi: "",
    paperLink: ""
  }
];

export const educationHistory: EducationItem[] = [
  {
    id: "mce-be-cse",
    degree: "B.E. in Computer Science and Engineering",
    institution: "Malnad College of Engineering (Autonomous), VTU",
    location: "Hassan, Karnataka",
    duration: "Jan 2023 – Jun 2027",
    scoreLabel: "Cumulative GPA",
    scoreValue: "9.09 / 10.0",
    highlights: [
      "Maintaining an outstanding 9.09 CGPA across core engineering and foundational semesters.",
      "Head of Digital & Social Media for IUCEE EWB-MCE Student Chapter and active event organizer.",
      "Focusing on Data Structures & Algorithms, Java enterprise backends, and AI/ML optimization systems."
    ],
    coursework: [
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming with Java & C++",
      "Database Management Systems (MySQL, SQL)",
      "Operating Systems & Process Concurrency",
      "Design & Analysis of Algorithms",
      "Computer Networks & Systems Architecture"
    ]
  },
  {
    id: "apj-pu-college",
    degree: "Pre-University (PCMC - Physics, Chemistry, Math, Computer Science)",
    institution: "APJ Academy (Endowing Gnanadhare PU College), State Board",
    location: "Hassan, Karnataka",
    duration: "2021 – 2023",
    scoreLabel: "Academic Performance",
    scoreValue: "91.67%",
    highlights: [
      "Graduated with High Distinction (91.67%) under Karnataka State Board.",
      "Built rigorous foundations in Mathematics, Physics, Chemistry, and Computer Science fundamentals.",
      "Developed early algorithmic problem-solving and programming skills in C++."
    ],
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
  },
  {
    id: "chiranthana-high-school",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Chiranthana English Medium High School, State Board",
    location: "Hassan, Karnataka",
    duration: "2021",
    scoreLabel: "Academic Performance",
    scoreValue: "89.92%",
    highlights: [
      "Graduated with Distinction (89.92%) under Karnataka State Board examinations.",
      "Consistently demonstrated scholastic excellence in mathematics and scientific reasoning."
    ],
    coursework: ["Mathematics", "Science", "Social Science", "English", "Kannada", "Hindi"]
  }
];

export const achievementsList: AchievementItem[] = [
  {
    id: "ach-aeronox",
    title: "Runner-up at Aeronox (AUNSF 2025)",
    category: "Hackathon",
    issuer: "Anurag University, Hyderabad",
    date: "2025",
    description: "Secured Runner-up award at Aeronox, a national aerospace & technology innovation competition hosted by Anurag University, Hyderabad.",
    badgeText: "National Runner-up",
    verificationUrl: "https://drive.google.com/file/d/1Q7OYmQjgXeiABZP92UV3Q5nyxMP2VNVP/view?usp=sharing"
  },
  {
    id: "ach-iasf-top20",
    title: "Top 20 Projects at IUCEE Annual Student Forum (IASF 2025)",
    category: "Technical",
    issuer: "VNR VJIET, Hyderabad & IUCEE",
    date: "2025",
    description: "Selected and recognized among the Top 20 student engineering innovations nationwide at the IUCEE Annual Student Forum (IASF 2025).",
    badgeText: "Top 20 Innovation",
    verificationUrl: "https://drive.google.com/file/d/16sJlMoGa9dO6BV8HF9POvtiXYtWHaJWI/view?usp=sharing"
  },
  {
    id: "ach-iasf-hackathon-2026",
    title: "EduAIthon — IUCEE Annual Student Forum 2026",
    category: "Hackathon",
    issuer: "IUCEE Annual Student Forum (IASF 2026)",
    date: "January 2026",
    description: "Participated in high-intensity collaborative coding, AI-driven educational software innovation, and rapid prototyping at EduAIthon during the IUCEE Annual Student Forum.",
    badgeText: "EduAIthon Finalist",
    verificationUrl: "https://drive.google.com/file/d/1ux3zMQqNqsGgI7E5igy7q9u49s3_Glen/view?usp=sharing"
  },
  {
    id: "ach-tech-triad",
    title: "Tech Triad 2025 Hackathon — Innovisions",
    category: "Hackathon",
    issuer: "Dept. of ISE, Dayananda Sagar Academy of Technology and Management (DSATM), Bengaluru",
    date: "November 2025",
    description: "Participated in TECH TRIAD-2025 International Tech Fest Hackathon, competing in high-intensity software problem solving organized with IEEE Student Branch.",
    badgeText: "Hackathon Competitor",
    verificationUrl: "https://drive.google.com/file/d/1nxjCke8P6-WlpCuSYQVkobGtcKPFP3fc/view?usp=sharing"
  },
  {
    id: "ach-vertex-navkis",
    title: "24-Hour Hackathon — Team Vertex Navkis",
    category: "Hackathon",
    issuer: "Navkis College of Engineering",
    date: "2025",
    description: "Participated in the competitive 24-hour hackathon organized by Team Vertex at Navkis College of Engineering, developing innovative technical solutions.",
    badgeText: "24-Hour Hackathon",
    verificationUrl: "https://drive.google.com/file/d/1ulh0-r1uxBB6LmLZG8Ns-92zX5ICtAtD/view?usp=sharing"
  },
  {
    id: "ach-cgpa",
    title: "Outstanding Academic Merit (9.09 CGPA)",
    category: "Academics",
    issuer: "Malnad College of Engineering, Hassan",
    date: "Ongoing (2023 – Present)",
    description: "Ranked among top performers in Computer Science and Engineering with a 9.09 cumulative GPA across rigorous academic coursework.",
    badgeText: "Top Tier Merit",
    verificationUrl: ""
  }
];

export const certificationsList: CertificationItem[] = [
  {
    id: "cert-mastering-python",
    title: "Mastering Python Certification",
    category: "Programming & Backend",
    issuer: "Professional Technical Training & Certification",
    date: "2025",
    description: "Comprehensive certification covering Python core concepts, object-oriented programming, data structures, algorithm design, and backend scripting.",
    badgeText: "Certified Developer",
    skills: ["Python", "OOP", "Data Structures", "Scripting", "Problem Solving"],
    verificationUrl: "https://drive.google.com/file/d/125whnvYABhEgwOKQmvTKoYTT3zhIVoAM/view?usp=sharing"
  },
  {
    id: "cert-web-development",
    title: "Web Development Certification",
    category: "Frontend & Web Tech",
    issuer: "IUCEE EWB–MCE Student Chapter",
    date: "2025",
    description: "Hands-on certification for web architecture, responsive layout design, DOM manipulation, CSS grid & flexbox systems, and interactive ES6+ JavaScript.",
    badgeText: "Web Developer",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "DOM"],
    verificationUrl: "https://drive.google.com/file/d/1Ze1jT4ogpUTOeRSo4hsWtBwnR8OGdshM/view?usp=sharing"
  },
  {
    id: "cert-figma-uiux",
    title: "Figma UI/UX Design Certification",
    category: "UI/UX & Design Systems",
    issuer: "IUCEE EWB–MCE Student Chapter",
    date: "2025",
    description: "Certification covering user interface wireframing, high-fidelity mockups, responsive component design systems, style guides, and interactive prototyping.",
    badgeText: "UI/UX Designer",
    skills: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems"],
    verificationUrl: "https://drive.google.com/file/d/1_Xy3Pc_rAQ7CklrR5Dz-EY4SC8sRq5N1/view?usp=sharing"
  },
  {
    id: "cert-convivial-coding",
    title: "Convivial Coding Competition",
    category: "Competitive Programming",
    issuer: "Department of Computer Science and Engineering",
    date: "2025",
    description: "Recognized in the Convivial Coding competitive programming contest, demonstrating algorithmic problem-solving, data structures mastery, and clean code implementation.",
    badgeText: "Contest Certificate",
    skills: ["Competitive Programming", "Data Structures", "Algorithms", "C++", "Java"],
    verificationUrl: "https://drive.google.com/file/d/1TlpRGQNNZ3GJ0FgISXPldS73DsZccSJq/view?usp=sharing"
  }
];
