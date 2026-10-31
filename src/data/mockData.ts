export interface CampusGist {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  faculty: string;
  campus: "Oye (Main)" | "Ikole" | "All Campuses";
  category: "Campus Gists" | "Entertainment News" | "Hostel Chronicles" | "Tech Buzz" | "Academic Scoop";
  emoji: string;
  reactions: {
    fire: number;
    mindblown: number;
    laugh: number;
  };
  commentsCount: number;
  timeAgo: string;
  isHot?: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  campus: "Oye (Main)" | "Ikole" | "Virtual";
  faculty: string;
  category: "Tech" | "Academic" | "Career" | "Social" | "Sports";
  organizer: string;
  attendeesCount: number;
  tags: string[];
  color: "purple" | "green" | "red" | "yellow" | "orange";
  featured?: boolean;
}

export interface OpenRole {
  role: string;
  skills: string[];
  description: string;
}

export interface StudentProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  goals: string[];
  faculty: string;
  department: string;
  campus: "Oye (Main)" | "Ikole";
  creators: { name: string; role: string; department: string }[];
  tags: string[];
  openRoles: OpenRole[];
  howToJoin: string;
  githubUrl?: string;
  liveUrl?: string;
  upvotes: number;
  lookingForContributors: boolean;
  color: "purple" | "green" | "red" | "yellow" | "orange";
  featured?: boolean;
}

export interface TeammateProfile {
  id: string;
  studentName: string;
  department: string;
  level: string;
  campus: "Oye (Main)" | "Ikole";
  projectTitle: string;
  projectType: "Hackathon" | "Final Year Project" | "Startup" | "Open Source" | "Study Group";
  rolesNeeded: string[];
  skillsRequired: string[];
  description: string;
  contactChannel: "WhatsApp" | "GitHub" | "Email";
  contactLink: string;
  avatarColor: "purple" | "green" | "red" | "yellow" | "orange";
  emoji: string;
  createdAt: string;
}

export interface CommunityOpportunity {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  type: "Grant" | "Fellowship" | "Competition" | "Hackathon";
  perk: string;
  description: string;
  link: string;
  color: "yellow" | "green" | "purple";
}

export const CAMPUS_GISTS: CampusGist[] = [
  {
    id: "gist-1",
    title: "Oye-Ikole Shuttle Fleet Officially Adds 4 New Buses! 🚌💨",
    content: "Big win for engineering and agriculture students commuting between campuses! The Student Union transit team confirmed 4 brand-new high-capacity buses will begin morning schedules from Oye Main Gate straight to Ikole workshops.",
    author: "Tunde 'Oracle' Balogun",
    authorRole: "SUG Transport Rep",
    faculty: "Faculty of Engineering",
    campus: "All Campuses",
    category: "Campus Gists",
    emoji: "🎉",
    reactions: { fire: 184, mindblown: 92, laugh: 14 },
    commentsCount: 42,
    timeAgo: "2 hours ago",
    isHot: true,
  },
  {
    id: "gist-2",
    title: "GDG FUOYE Hackathon: Pizza & ₦500k Prize Pool Confirmed! 🍕💻",
    content: "Registration for the 48-hour hackathon just crossed 200 developers. Mentors from Flutterwave and Paystack are reviewing finalist project tracks. If you still need a UI/UX designer, post on the Find People tab ASAP!",
    author: "Ayomide Dev",
    authorRole: "GDG Campus Lead",
    faculty: "Faculty of Science",
    campus: "Oye (Main)",
    category: "Tech Buzz",
    emoji: "🔥",
    reactions: { fire: 312, mindblown: 145, laugh: 8 },
    commentsCount: 68,
    timeAgo: "4 hours ago",
    isHot: true,
  },
  {
    id: "gist-3",
    title: "Hostel Wi-Fi Upgrade: Speed Test Reaches 45Mbps at Phase 2 📶⚡",
    content: "Students in Phase 2 hostel can now access the upgraded optical fiber terminal installed this weekend. Finally, no more standing near the balcony to push git commits at 2 AM!",
    author: "Chidera Okafor",
    authorRole: "300L Computer Science",
    faculty: "Faculty of Science",
    campus: "Oye (Main)",
    category: "Hostel Chronicles",
    emoji: "🤯",
    reactions: { fire: 240, mindblown: 210, laugh: 5 },
    commentsCount: 51,
    timeAgo: "Yesterday",
    isHot: false,
  },
  {
    id: "gist-4",
    title: "FUOYE Inter-Faculty Football Finals: Science vs Engineering! ⚽🏆",
    content: "The rivalry is real! Faculty of Science takes on Ikole's Faculty of Engineering this Saturday. Campus DJ and hype men are officially booked. Who are you rooting for?",
    author: "Bisi 'Sporty' Adeleke",
    authorRole: "Sports Director",
    faculty: "General Campus",
    campus: "All Campuses",
    category: "Entertainment News",
    emoji: "🔥",
    reactions: { fire: 410, mindblown: 55, laugh: 89 },
    commentsCount: 94,
    timeAgo: "Yesterday",
    isHot: true,
  },
  {
    id: "gist-5",
    title: "Exam Timetable Draft Released: Check Your Departmental Clashes 📝⚠️",
    content: "The preliminary semester exam timetable is out on the portal. Please double-check with your department course reps to flag overlapping general studies and faculty courses before Friday.",
    author: "Academic Affairs Unit",
    authorRole: "Student Rep",
    faculty: "Cross-Faculty",
    campus: "All Campuses",
    category: "Academic Scoop",
    emoji: "📢",
    reactions: { fire: 95, mindblown: 120, laugh: 32 },
    commentsCount: 39,
    timeAgo: "2 days ago",
    isHot: false,
  },
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "GDG FUOYE Open Source & Web Workshop",
    description: "Hands-on collaborative session introducing Git, GitHub, and modern web development practices to students across all faculties. Bring your laptops and your best energy!",
    date: "NOV 14, 2026",
    time: "10:00 AM - 1:00 PM WAT",
    venue: "ETF Lecture Theatre, Oye Main Campus",
    campus: "Oye (Main)",
    faculty: "Faculty of Science",
    category: "Tech",
    organizer: "GDG on Campus FUOYE",
    attendeesCount: 168,
    tags: ["Open Source", "WebDev", "Git", "JavaScript"],
    color: "purple",
    featured: true,
  },
  {
    id: "evt-2",
    title: "Ikole Engineering Hardware & IoT Showcase",
    description: "Annual project showcase where Mechatronics and Electrical Engineering students demonstrate solar inverters, smart automated farm monitors, and microcontroller robotics.",
    date: "NOV 21, 2026",
    time: "11:30 AM - 3:00 PM WAT",
    venue: "Engineering Workshop Block B, Ikole Campus",
    campus: "Ikole",
    faculty: "Faculty of Engineering",
    category: "Tech",
    organizer: "NUESA FUOYE Chapter",
    attendeesCount: 112,
    tags: ["Robotics", "IoT", "Embedded", "Arduino"],
    color: "green",
    featured: true,
  },
  {
    id: "evt-3",
    title: "NACOS Annual Tech Career Fair & Portfolio Review",
    description: "Connect with alumni working in top Nigerian tech firms. Get your design portfolios and GitHub profiles audited by senior engineers and find internship opportunities.",
    date: "DEC 02, 2026",
    time: "9:00 AM - 2:00 PM WAT",
    venue: "University Main Auditorium, Oye Campus",
    campus: "Oye (Main)",
    faculty: "Faculty of Science",
    category: "Career",
    organizer: "NACOS FUOYE",
    attendeesCount: 295,
    tags: ["Career", "Networking", "Software", "Fintech"],
    color: "red",
    featured: true,
  },
  {
    id: "evt-4",
    title: "Virtual Design Jam: Figma Prototyping Challenge",
    description: "High-energy 2-hour online sprint hosted on Google Meet. Learn design tokens, typography scale, and build an interactive student hostel food ordering flow.",
    date: "DEC 15, 2026",
    time: "7:00 PM - 9:00 PM WAT",
    venue: "Online (Google Meet)",
    campus: "Virtual",
    faculty: "Cross-Faculty",
    category: "Tech",
    organizer: "FUOYE Product Designers Community",
    attendeesCount: 84,
    tags: ["UI/UX", "Figma", "Design Sprint"],
    color: "yellow",
    featured: false,
  },
  {
    id: "evt-5",
    title: "Ekiti Sustainable Agriculture Research Symposium",
    description: "Student presentations on smart farm sensors, drip irrigation methods, and cassava yield optimization suited for local farm communities in Ikole-Ekiti.",
    date: "DEC 18, 2026",
    time: "10:00 AM - 1:00 PM WAT",
    venue: "Faculty of Agriculture Hall, Ikole Campus",
    campus: "Ikole",
    faculty: "Faculty of Agriculture",
    category: "Academic",
    organizer: "AgriTech Student Association",
    attendeesCount: 76,
    tags: ["AgriTech", "Research", "Sensors"],
    color: "orange",
    featured: false,
  },
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "course-companion",
    title: "FUOYE Course Companion",
    tagline: "Offline-first access to departmental past questions, notes, and course outlines.",
    description: "A lightweight Progressive Web App designed specifically to solve unstable hostel internet problems. Students can save syllabus notes locally on any smartphone with zero data usage after initial sync.",
    goals: [
      "Deliver instant offline study material access on low-bandwidth phones.",
      "Index past exam papers from 2018 to present across Science, Engineering, and Arts.",
      "Enable departmental class reps to upload verified lecture PDFs with moderator review."
    ],
    faculty: "Faculty of Science",
    department: "Computer Science",
    campus: "Oye (Main)",
    creators: [
      { name: "Oluwaseun Bakare", role: "Frontend Lead", department: "Computer Science (300L)" },
      { name: "Blessing Eze", role: "Content & Research", department: "Mass Communication (400L)" }
    ],
    tags: ["Next.js", "PWA", "Offline-First", "TailwindCSS"],
    openRoles: [
      {
        role: "UI/UX Designer",
        skills: ["Figma", "Design Systems", "Mobile Prototyping"],
        description: "Redesign the offline search interface and optimize reading readability on budget Android devices."
      },
      {
        role: "Department Coordinators",
        skills: ["Content Curation", "Verification"],
        description: "Collect past exam outlines for Faculty of Social Sciences and Arts."
      }
    ],
    howToJoin: "Join our open GitHub repository or message the project lead on WhatsApp to claim an open role.",
    githubUrl: "https://github.com/example/fuoye-companion",
    liveUrl: "https://example-companion.vercel.app",
    upvotes: 94,
    lookingForContributors: true,
    color: "purple",
    featured: true,
  },
  {
    id: "ikole-farm-sensor",
    title: "Ikole Smart Farm Telemetry",
    tagline: "Low-cost solar-powered IoT soil monitoring stations for experimental student crop plots.",
    description: "Built by engineering students at Ikole campus using ESP32 microcontrollers, moisture probes, and an open telemetry dashboard. System alerts student researchers when plots need irrigation.",
    goals: [
      "Sample soil moisture, temperature, and ambient humidity every 30 minutes.",
      "Send sensor telemetry via cellular data to a public open-source web dashboard.",
      "Keep total build cost under ₦25,000 using locally sourced recycled casing."
    ],
    faculty: "Faculty of Engineering",
    department: "Mechatronics Engineering",
    campus: "Ikole",
    creators: [
      { name: "Chinedu Okafor", role: "Hardware Engineer", department: "Mechatronics (400L)" },
      { name: "Ibrahim Sanni", role: "Firmware Dev", department: "Electrical Engineering (400L)" }
    ],
    tags: ["IoT", "ESP32", "Python", "FastAPI", "Hardware"],
    openRoles: [
      {
        role: "Dashboard Frontend Dev",
        skills: ["React", "Chart.js", "TailwindCSS"],
        description: "Build clean visual graphs to display weekly moisture fluctuations and temperature alerts."
      }
    ],
    howToJoin: "Contact Chinedu on WhatsApp or visit the Engineering Mechatronics Lab in Ikole on Wednesday afternoons.",
    githubUrl: "https://github.com/example/ikole-farm-telemetry",
    upvotes: 78,
    lookingForContributors: true,
    color: "green",
    featured: true,
  },
  {
    id: "shuttle-sync",
    title: "Oye-Ikole Shuttle Sync",
    tagline: "Crowdsourced departure schedules and passenger estimates for inter-campus transit.",
    description: "Students frequently travel the 35km distance between Oye Main Campus and Ikole Campus. Shuttle Sync lets drivers and students share real-time boarding updates.",
    goals: [
      "Eliminate 2-hour wait times at Oye main park and Ikole bus stop.",
      "Track standard fare prices to prevent surge exploitation during exam season.",
      "Provide verified student driver contact numbers for safe late-evening transit."
    ],
    faculty: "Faculty of Social Sciences",
    department: "Economics",
    campus: "Oye (Main)",
    creators: [
      { name: "Adebayo Kunle", role: "Product Manager", department: "Economics (300L)" }
    ],
    tags: ["React", "Firebase", "Geolocation", "Mobile"],
    openRoles: [
      {
        role: "React Native Developer",
        skills: ["React Native", "Expo", "JavaScript"],
        description: "Help port our web tool into a lightweight Android APK for students with low phone memory."
      }
    ],
    howToJoin: "Reach out via our open community link to contribute code or test driver dispatch.",
    githubUrl: "https://github.com/example/shuttle-sync",
    upvotes: 116,
    lookingForContributors: true,
    color: "yellow",
    featured: true,
  },
  {
    id: "cgpa-calculator",
    title: "FUOYE Semester CGPA Predictor",
    tagline: "Accurate grade point average calculator following the official 5.0 FUOYE grading scale.",
    description: "An offline calculation tool that allows students to input course units, expected grades, and simulate target GPA requirements needed for second-class upper or first-class graduation benchmarks.",
    goals: [
      "Standardize grading calculations according to the Senate-approved 5-point grading scheme.",
      "Allow saving academic records safely in browser localStorage with zero server tracking.",
      "Generate printable PDF grade breakdown reports for personal academic planning."
    ],
    faculty: "Faculty of Science",
    department: "Mathematics",
    campus: "Oye (Main)",
    creators: [
      { name: "Fatima Bello", role: "Software Developer", department: "Mathematics (200L)" }
    ],
    tags: ["TypeScript", "TailwindCSS", "LocalStorage", "Client-Side"],
    openRoles: [],
    howToJoin: "The core calculation engine is stable. Open pull requests on GitHub for departmental course presets.",
    githubUrl: "https://github.com/example/fuoye-cgpa-calculator",
    liveUrl: "https://fuoye-cgpa.example.com",
    upvotes: 56,
    lookingForContributors: false,
    color: "red",
    featured: false,
  }
];

export const TEAMMATE_PROFILES: TeammateProfile[] = [
  {
    id: "team-1",
    studentName: "Ayomide Adeyemi",
    department: "Computer Science",
    level: "300L",
    campus: "Oye (Main)",
    projectTitle: "Kampus Konnect Open-Source Community Portal",
    projectType: "Hackathon",
    rolesNeeded: ["UI/UX Designer", "Technical Writer"],
    skillsRequired: ["Figma", "Design Systems", "Markdown"],
    description: "Building the official student culture and collaboration platform for FUOYE. Looking for a passionate Figma designer to polish mobile component sheets and a technical writer for our open-source repo.",
    contactChannel: "WhatsApp",
    contactLink: "https://wa.me/2348000000001",
    avatarColor: "purple",
    emoji: "⚡",
    createdAt: "2 hours ago",
  },
  {
    id: "team-2",
    studentName: "Samuel Adeleke",
    department: "Mechatronics Engineering",
    level: "400L",
    campus: "Ikole",
    projectTitle: "Automated Solar Tracking Inverter for Labs",
    projectType: "Final Year Project",
    rolesNeeded: ["Embedded Programmer", "PCB Layout Designer"],
    skillsRequired: ["C/C++", "Arduino", "KiCad", "Circuit Design"],
    description: "Final year research project designing a dual-axis solar tracker with real-time battery status monitoring. Looking for an engineering partner based in Ikole with hands-on soldering and circuit prototyping experience.",
    contactChannel: "WhatsApp",
    contactLink: "https://wa.me/2348000000002",
    avatarColor: "green",
    emoji: "🔋",
    createdAt: "Yesterday",
  },
  {
    id: "team-3",
    studentName: "Kehinde Balogun",
    department: "Mass Communication",
    level: "300L",
    campus: "Oye (Main)",
    projectTitle: "FUOYE Student Spotlight Podcast & Media Hub",
    projectType: "Open Source",
    rolesNeeded: ["Audio Editor", "Web Developer"],
    skillsRequired: ["Audacity/Premiere", "Next.js", "TailwindCSS"],
    description: "A student-led digital magazine covering student innovations, hackathons, and creative writing. We need a frontend developer to help host our episodes online with audio streaming.",
    contactChannel: "Email",
    contactLink: "mailto:kehinde.sample@fuoye.edu.ng",
    avatarColor: "red",
    emoji: "🎙️",
    createdAt: "2 days ago",
  },
  {
    id: "team-4",
    studentName: "Grace Ogundipe",
    department: "Agricultural Economics",
    level: "400L",
    campus: "Ikole",
    projectTitle: "Ekiti Local Farmer Produce Price Index",
    projectType: "Startup",
    rolesNeeded: ["Data Analyst", "Mobile Developer"],
    skillsRequired: ["Python", "Pandas", "Flutter", "Excel"],
    description: "Collecting weekly market prices for cassava, yam, and palm oil in Oye, Ikole, and Ado-Ekiti to provide transparent market data to student farm cooperatives.",
    contactChannel: "WhatsApp",
    contactLink: "https://wa.me/2348000000004",
    avatarColor: "yellow",
    emoji: "📊",
    createdAt: "3 days ago",
  },
  {
    id: "team-5",
    studentName: "Tobiloba Alao",
    department: "Electrical Engineering",
    level: "200L",
    campus: "Ikole",
    projectTitle: "Hult Prize Campus Challenge: Clean Energy",
    projectType: "Hackathon",
    rolesNeeded: ["Pitch Deck Designer", "Financial Modeler"],
    skillsRequired: ["Presentation Design", "Financial Projections", "Pitching"],
    description: "Preparing for the university-level Hult Prize competition. We need someone who can design a compelling 10-slide pitch deck and help with cost estimates.",
    contactChannel: "GitHub",
    contactLink: "https://github.com/example-tobiloba",
    avatarColor: "orange",
    emoji: "🔥",
    createdAt: "5 days ago",
  },
];

export const COMMUNITY_OPPORTUNITIES: CommunityOpportunity[] = [
  {
    id: "opp-1",
    title: "Google Student Ambassador Program 2026",
    organization: "Google for Developers",
    deadline: "Nov 30, 2026",
    type: "Fellowship",
    perk: "Mentorship & Google Swag Box",
    description: "Represent Google technologies on campus, lead hands-on workshops, and connect with global student developers.",
    link: "https://developers.google.com/community/gdsc",
    color: "purple",
  },
  {
    id: "opp-2",
    title: "Ekiti State Student Tech Innovation Grant",
    organization: "Ekiti State Tech Hub",
    deadline: "Dec 15, 2026",
    type: "Grant",
    perk: "₦1,000,000 Seed Funding",
    description: "Grants for undergraduate hardware and software prototypes addressing local agricultural, transportation, or educational problems.",
    link: "https://example.com/grant",
    color: "yellow",
  },
  {
    id: "opp-3",
    title: "NACOS Open Source Contributor Fellowship",
    organization: "NACOS National",
    deadline: "Dec 20, 2026",
    type: "Hackathon",
    perk: "Cloud Credits & Job Referrals",
    description: "Contribute to verified Nigerian open-source projects, learn Git pull request workflows, and build an audited engineering portfolio.",
    link: "https://example.com/fellowship",
    color: "green",
  },
];
