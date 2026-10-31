export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  campus: "Oye (Main)" | "Ikole" | "Virtual";
  faculty: string;
  category: "Tech" | "Academic" | "Social" | "Career" | "Sports";
  organizer: string;
  attendeesCount: number;
  tags: string[];
}

export interface CollabPost {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  faculty: string;
  department: string;
  campus: "Oye (Main)" | "Ikole";
  projectType: "Hackathon" | "Final Year Project" | "Startup" | "Open Source" | "Study Group";
  rolesNeeded: string[];
  skillsRequired: string[];
  description: string;
  contactPlatform: "WhatsApp" | "Telegram" | "GitHub" | "Email";
  contactHandle: string;
  createdAt: string;
}

export interface StudentProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  creators: { name: string; department: string }[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  upvotes: number;
  faculty: string;
}

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "GDG FUOYE Hacktoberfest Code & Chill",
    description: "Join fellow developers at FUOYE to make open-source contributions, learn Git & GitHub, and collaborate on real-world projects with pizza and mentorship.",
    date: "Nov 5, 2026",
    time: "10:00 AM WAT",
    venue: "ETF Hall, Oye Campus",
    campus: "Oye (Main)",
    faculty: "Faculty of Science",
    category: "Tech",
    organizer: "GDG on Campus FUOYE",
    attendeesCount: 142,
    tags: ["Open Source", "Hacktoberfest", "WebDev", "Gemma AI"]
  },
  {
    id: "evt-2",
    title: "Ikole Engineering Robotics & IoT Exhibition",
    description: "Showcasing student-built embedded systems, solar inverters, and automated agricultural monitoring devices built by Mechatronics and Electrical engineering students.",
    date: "Nov 12, 2026",
    time: "11:30 AM WAT",
    venue: "Engineering Workshop B, Ikole Campus",
    campus: "Ikole",
    faculty: "Faculty of Engineering",
    category: "Tech",
    organizer: "NUESA FUOYE",
    attendeesCount: 95,
    tags: ["Robotics", "IoT", "Hardware", "Arduino"]
  },
  {
    id: "evt-3",
    title: "NACOS Annual Tech Summit & Career Fair",
    description: "Keynote speeches from tech alumni at Flutterwave, Paystack, and Google. Portfolio reviews, resume doctor, and mock interviews for Computer Science students.",
    date: "Nov 18, 2026",
    time: "9:00 AM WAT",
    venue: "University Auditorium, Oye Campus",
    campus: "Oye (Main)",
    faculty: "Faculty of Science",
    category: "Career",
    organizer: "NACOS FUOYE Chapter",
    attendeesCount: 310,
    tags: ["Career", "Networking", "Internships", "Fintech"]
  },
  {
    id: "evt-4",
    title: "FUOYE Inter-Faculty Football Tournament",
    description: "Quarter-finals clash between Faculty of Engineering (Ikole) and Faculty of Science (Oye). Come cheer your faculty!",
    date: "Nov 20, 2026",
    time: "4:00 PM WAT",
    venue: "University Sports Complex",
    campus: "Oye (Main)",
    faculty: "General",
    category: "Sports",
    organizer: "SUG Sports Committee",
    attendeesCount: 520,
    tags: ["Sports", "Football", "Campus Life"]
  }
];

export const INITIAL_COLLAB_POSTS: CollabPost[] = [
  {
    id: "collab-1",
    title: "Need a UI/UX Designer for Hacktoberfest FUOYE Portal",
    author: "Ayomide Adeyemi",
    authorRole: "300L Computer Science",
    faculty: "Faculty of Science",
    department: "Computer Science",
    campus: "Oye (Main)",
    projectType: "Hackathon",
    rolesNeeded: ["UI/UX Designer", "Figma Lead"],
    skillsRequired: ["Figma", "Design Systems", "Mobile Wireframing"],
    description: "We are building an open-source campus tool and need someone to help craft clean mobile layouts and user flow diagrams.",
    contactPlatform: "WhatsApp",
    contactHandle: "https://wa.me/2348000000000",
    createdAt: "2 hours ago"
  },
  {
    id: "collab-2",
    title: "Building Smart Irrigation Prototype for Ikole Farmland",
    author: "Chinedu Okafor",
    authorRole: "400L Mechatronics Engineering",
    faculty: "Faculty of Engineering",
    department: "Mechatronics Engineering",
    campus: "Ikole",
    projectType: "Final Year Project",
    rolesNeeded: ["Backend Dev", "Data Analyst"],
    skillsRequired: ["Python", "Flask/FastAPI", "ESP32", "PostgreSQL"],
    description: "Developing an IoT sensor array that sends soil moisture and temperature telemetry to a dashboard for local farmers around Ikole-Ekiti.",
    contactPlatform: "WhatsApp",
    contactHandle: "https://wa.me/2348000000001",
    createdAt: "Yesterday"
  },
  {
    id: "collab-3",
    title: "Flutter Mobile App: FUOYE Timetable & CGPA Planner",
    author: "Fatima Bello",
    authorRole: "200L Software Engineering",
    faculty: "Faculty of Science",
    department: "Computer Science",
    campus: "Oye (Main)",
    projectType: "Open Source",
    rolesNeeded: ["Flutter Dev", "Technical Writer"],
    skillsRequired: ["Flutter", "Dart", "Markdown", "Git"],
    description: "Offline-first app for students to save their semester lecture schedule, track attendance, and calculate projected CGPAs.",
    contactPlatform: "GitHub",
    contactHandle: "https://github.com",
    createdAt: "3 days ago"
  }
];

export const INITIAL_PROJECTS: StudentProject[] = [
  {
    id: "proj-1",
    title: "FUOYE Course Companion",
    tagline: "Offline access to departmental past questions and syllabus summaries.",
    description: "A lightweight PWA built with Next.js and IndexedDB to allow students in Oye and Ikole to read lecture notes without internet access.",
    creators: [
      { name: "Oluwaseun Bakare", department: "Computer Science" },
      { name: "Blessing Eze", department: "Mass Communication" }
    ],
    tags: ["Next.js", "PWA", "Offline-First", "TailwindCSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    upvotes: 84,
    faculty: "Faculty of Science"
  },
  {
    id: "proj-2",
    title: "Ikole-Oye Shuttle Tracker",
    tagline: "Real-time departure alerts for inter-campus shuttle buses.",
    description: "Helps engineering and agriculture students know when campus buses are boarding between Oye main gate and Ikole campus.",
    creators: [
      { name: "Tunde Alabi", department: "Electrical Engineering" }
    ],
    tags: ["React Native", "Google Maps", "Firebase"],
    githubUrl: "https://github.com",
    upvotes: 62,
    faculty: "Faculty of Engineering"
  },
  {
    id: "proj-3",
    title: "Campus Market Bot",
    tagline: "Telegram bot for peer-to-peer student item exchanges.",
    description: "Enables verified students to safely trade textbooks, hostel furniture, and electronic accessories.",
    creators: [
      { name: "Emmanuel Adeleke", department: "Economics" }
    ],
    tags: ["Python", "Telegram API", "Supabase"],
    liveUrl: "https://t.me",
    upvotes: 49,
    faculty: "Faculty of Social Sciences"
  }
];

