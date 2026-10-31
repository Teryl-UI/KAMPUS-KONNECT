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
  createdAt: string;
}

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "GDG FUOYE Open Source & Web Workshop",
    description: "Hands-on collaborative session introducing Git, GitHub, and modern web development practices to students across all faculties. Bring your laptops!",
    date: "November 14, 2026",
    time: "10:00 AM - 1:00 PM WAT",
    venue: "ETF Lecture Theatre, Oye Main Campus",
    campus: "Oye (Main)",
    faculty: "Faculty of Science",
    category: "Tech",
    organizer: "GDG on Campus FUOYE",
    attendeesCount: 128,
    tags: ["Open Source", "Web Development", "Git", "JavaScript"],
    featured: true
  },
  {
    id: "evt-2",
    title: "Ikole Engineering Hardware & IoT Showcase",
    description: "Annual project showcase where Mechatronics and Electrical Engineering students demonstrate solar inverters, smart automated farm monitors, and microcontroller robotics.",
    date: "November 21, 2026",
    time: "11:30 AM - 3:00 PM WAT",
    venue: "Engineering Workshop Block B, Ikole Campus",
    campus: "Ikole",
    faculty: "Faculty of Engineering",
    category: "Tech",
    organizer: "NUESA FUOYE Chapter",
    attendeesCount: 94,
    tags: ["Robotics", "IoT", "Embedded Systems", "Arduino"],
    featured: true
  },
  {
    id: "evt-3",
    title: "NACOS Annual Tech Career Fair & Portfolio Review",
    description: "Connect with alumni working in leading Nigerian fintech and technology firms. Get your resume reviewed, test in mock interviews, and find internship opportunities.",
    date: "December 2, 2026",
    time: "9:00 AM - 2:00 PM WAT",
    venue: "University Main Auditorium, Oye Campus",
    campus: "Oye (Main)",
    faculty: "Faculty of Science",
    category: "Career",
    organizer: "NACOS FUOYE",
    attendeesCount: 245,
    tags: ["Career", "Networking", "Software Engineering", "Internships"],
    featured: true
  },
  {
    id: "evt-4",
    title: "Academic Research Symposium: Sustainable Agriculture in Ekiti",
    description: "Student and faculty presentations on modern hydroponics, soil mapping, and farm technology suited for local agricultural communities in Ekiti State.",
    date: "December 8, 2026",
    time: "10:00 AM - 1:00 PM WAT",
    venue: "Faculty of Agriculture Hall, Ikole Campus",
    campus: "Ikole",
    faculty: "Faculty of Agriculture",
    category: "Academic",
    organizer: "Agriculture Student Association",
    attendeesCount: 78,
    tags: ["AgriTech", "Research", "Sustainability"],
    featured: false
  },
  {
    id: "evt-5",
    title: "FUOYE Inter-Faculty Sports Games: Opening Ceremony",
    description: "The annual university sporting competition kicks off with football, basketball, track & field, and volleyball matches between Oye and Ikole faculties.",
    date: "December 12, 2026",
    time: "3:30 PM WAT",
    venue: "University Sports Ground, Oye Campus",
    campus: "Oye (Main)",
    faculty: "General Campus",
    category: "Sports",
    organizer: "SUG Sports Committee",
    attendeesCount: 420,
    tags: ["Sports", "Football", "Campus Life"],
    featured: false
  },
  {
    id: "evt-6",
    title: "Virtual Design Jam: Accessible UX for Campus Tools",
    description: "Online design challenge hosted on Google Meet. Learn Figma component design and design an intuitive hostel booking screen in under 2 hours.",
    date: "December 15, 2026",
    time: "7:00 PM - 9:00 PM WAT",
    venue: "Online (Google Meet)",
    campus: "Virtual",
    faculty: "Cross-Faculty",
    category: "Tech",
    organizer: "FUOYE Product Designers Community",
    attendeesCount: 65,
    tags: ["UI/UX", "Figma", "Design", "Virtual"],
    featured: false
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "course-companion",
    title: "FUOYE Course Companion",
    tagline: "Offline-first access to departmental lecture notes, past questions, and syllabus summaries.",
    description: "A lightweight Progressive Web App designed specifically to solve unstable internet challenges for students reading in hostels and study halls. Notes can be saved locally on any smartphone with zero data usage after initial sync.",
    goals: [
      "Provide reliable, fast offline study material access for students on low-bandwidth connections.",
      "Digitize past exam questions from 2018 to present across Computer Science, Engineering, and Social Sciences.",
      "Enable class representatives to upload verified PDF course outlines with departmental moderation."
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
        description: "Redesign the offline search interface and optimize typography for reading on smaller Android displays."
      },
      {
        role: "Departmental Coordinators",
        skills: ["Document curation", "Proofreading"],
        description: "Assist with collecting and indexing past questions for the Faculties of Arts, Law, and Education."
      }
    ],
    howToJoin: "Join our open GitHub repository or message the lead developer on WhatsApp to claim an open issue.",
    githubUrl: "https://github.com/example/fuoye-companion",
    liveUrl: "https://example-companion.vercel.app",
    upvotes: 68,
    lookingForContributors: true,
    featured: true
  },
  {
    id: "ikole-farm-sensor",
    title: "Ikole Smart Farm Telemetry",
    tagline: "Low-cost solar-powered IoT soil monitoring stations for experimental student farmlands.",
    description: "Built by engineering students at Ikole campus using ESP32 microcontrollers, capacitance soil moisture probes, and a simple dashboard. The system alerts student researchers when trial crop plots need irrigation.",
    goals: [
      "Measure soil moisture, ambient temperature, and humidity every 30 minutes.",
      "Send sensor readings via cellular telemetry to an accessible open-source web dashboard.",
      "Minimize hardware build cost to under ₦25,000 using locally sourced components."
    ],
    faculty: "Faculty of Engineering",
    department: "Mechatronics Engineering",
    campus: "Ikole",
    creators: [
      { name: "Chinedu Okafor", role: "Hardware Engineer", department: "Mechatronics (400L)" },
      { name: "Ibrahim Sanni", role: "Firmware Developer", department: "Electrical Engineering (400L)" }
    ],
    tags: ["IoT", "ESP32", "Python", "FastAPI", "Hardware"],
    openRoles: [
      {
        role: "Frontend Dashboard Developer",
        skills: ["React", "Chart.js or Recharts", "TailwindCSS"],
        description: "Build clean visual graphs to render weekly telemetry data and soil moisture trendlines."
      }
    ],
    howToJoin: "Contact Chinedu on WhatsApp or visit the Engineering Mechatronics Lab in Ikole on Wednesday afternoons.",
    githubUrl: "https://github.com/example/ikole-farm-telemetry",
    upvotes: 52,
    lookingForContributors: true,
    featured: true
  },
  {
    id: "shuttle-sync",
    title: "Oye-Ikole Shuttle Sync",
    tagline: "Crowdsourced departure schedules and passenger estimates for inter-campus shuttle buses.",
    description: "Students frequently travel the 35km distance between Oye Main Campus and Ikole Campus for administrative clearance, laboratory sessions, or lectures. Shuttle Sync lets drivers and students share real-time departure updates.",
    goals: [
      "Reduce waiting hours at Oye main gate and Ikole bus stop.",
      "Track standard fare prices and prevent unexpected rate hikes.",
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
        description: "Help port our web MVP into a lightweight Android APK for students with limited browser memory."
      },
      {
        role: "Campus Ambassador",
        skills: ["Communication", "Community Outreach"],
        description: "Onboard campus park drivers and student union transit reps at Oye and Ikole gates."
      }
    ],
    howToJoin: "Reach out through our open team chat to contribute code or help with campus outreach.",
    githubUrl: "https://github.com/example/shuttle-sync",
    upvotes: 89,
    lookingForContributors: true,
    featured: true
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
    upvotes: 41,
    lookingForContributors: false,
    featured: false
  }
];

export const TEAMMATE_PROFILES: TeammateProfile[] = [
  {
    id: "team-1",
    studentName: "Ayomide Adeyemi",
    department: "Computer Science",
    level: "300L",
    campus: "Oye (Main)",
    projectTitle: "FUOYE Open Source Campus Connect Portal",
    projectType: "Hackathon",
    rolesNeeded: ["UI/UX Designer", "Technical Writer"],
    skillsRequired: ["Figma", "Design Systems", "Markdown"],
    description: "Building an open-source web platform for FUOYE students. Looking for a designer to create consistent components and a technical writer to refine documentation.",
    contactChannel: "WhatsApp",
    contactLink: "https://wa.me/2348000000001",
    createdAt: "2 days ago"
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
    description: "Final year research project designing a dual-axis solar tracker with real-time battery status monitoring. Looking for an engineering partner based in Ikole.",
    contactChannel: "WhatsApp",
    contactLink: "https://wa.me/2348000000002",
    createdAt: "3 days ago"
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
    skillsRequired: ["Audacity/Premiere", "HTML/CSS", "Next.js"],
    description: "A student-led digital magazine covering student innovations, hackathons, and creative writing. We need a developer to help host our episodes online.",
    contactChannel: "Email",
    contactLink: "mailto:kehinde.sample@fuoye.edu.ng",
    createdAt: "4 days ago"
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
    createdAt: "1 week ago"
  },
  {
    id: "team-5",
    studentName: "Tobiloba Alao",
    department: "Electrical & Electronics Engineering",
    level: "200L",
    campus: "Ikole",
    projectTitle: "Hult Prize Campus Challenge: Clean Energy",
    projectType: "Hackathon",
    rolesNeeded: ["Pitch Deck Designer", "Financial Modeler"],
    skillsRequired: ["Presentation Design", "Financial Projections", "Pitching"],
    description: "Preparing for the university-level Hult Prize competition. We need someone who can design a compelling 10-slide pitch deck and help with cost estimates.",
    contactChannel: "GitHub",
    contactLink: "https://github.com/example-tobiloba",
    createdAt: "1 week ago"
  }
];
