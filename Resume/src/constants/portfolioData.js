export const PORTFOLIO_DATA = {
  personal: {
    name: "Awanish Kumar Rai",
    title: "B.Tech CSE (Class of 2027)",
    subtitle: "Software Engineer | Competitive Programmer",
    email: "awanishrai420@gmail.com",
    phone: "+91-6283642238",
    location: "India",
  },
  education: {
    current: {
      institution: "Lovely Professional University",
      program: "B.Tech Computer Science and Engineering",
      specialization: "Computer Science",
      cgpa: "8.29",
      expectedGraduation: "2027",
      highlights: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Computer Networks",
        "Database Management Systems",
      ],
    },
    previous: [
      {
        institution: "Sant Longowal Institute of Engineering and Technology",
        program: "Diploma in Chemical Technology",
        level: "Diploma",
        cgpa: "9.15",
        year: "2023",
        score: "CGPA 9.15",
      },
      {
        institution: "Cambridge Senior Secondary School",
        program: "Matriculation",
        level: "10th",
        percentage: "85.8%",
        year: "2020",
        score: "85.8%",
      },
    ],
  },
  socials: {
    github: "https://github.com/awanishkrai",
    linkedin: "https://linkedin.com/in/awanish-rai-9296ab221",
    codeforces: "https://codeforces.com/profile/Awanish_Rai",
    codechef: "https://codechef.com/users/master_magnus",
  },
  skills: {
    Languages: ["Python", "C++", "Java", "JavaScript", "PHP"],
    Frontend: ["React.js", "Redux", "Tailwind CSS", "HTML5", "CSS3"],
    Backend: ["Django", "Flask", "Node.js", "REST APIs"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB"],
    "DevOps & Tools": ["Git", "GitHub", "Postman", "Networking", "OS"],
  },
  competitiveProgramming: [
    {
      platform: "LeetCode",
      rating: 1635,
      label: "Current rating",
      color: "#eab308",
      url: "https://leetcode.com",
    },
    {
      platform: "CodeChef",
      rating: 1434,
      label: "2★ rating",
      color: "#f97316",
      url: "https://www.codechef.com/users/master_magnus",
    },
    {
      platform: "Codeforces",
      rating: 1285,
      label: "Pupil",
      color: "#3b82f6",
      url: "https://codeforces.com/profile/Awanish_Rai",
    },
  ],
  projects: [
    {
      name: "OS Based Room Booking System",
      description:
        "Concurrent backend room booking system that safely handles overlapping booking requests.",
      technologies: "Python, Django REST Framework, Threading, Semaphores, PostgreSQL",
      highlights: [
        "Implements FCFS scheduling with semaphores and multithreading",
        "Prevents race conditions during simultaneous booking requests",
        "Provides a clean REST API for room search and booking",
      ],
      github: "https://github.com/awanishkrai",
    },
    {
      name: "My-Bookings",
      description:
        "Production-grade booking platform with low-latency APIs, caching, and real-time updates.",
      technologies:
        "React, Node.js, Express, MongoDB, Redis, Socket.io, Docker, Python",
      highlights: [
        "Redis-backed caching layer for faster read performance",
        "Real-time booking updates over WebSockets (Socket.io)",
        "Containerized services using Docker for easy deployment",
      ],
      github: "https://github.com/awanishkrai",
    },
    {
      name: "AlgoPhoto",
      description:
        "Algorithmic image processing system focused on pixel-level transformations.",
      technologies: "Python, Dynamic Programming, Image Processing",
      highlights: [
        "Implements dynamic programming based transformations without heavy CV libraries",
        "Supports batch processing and custom filter pipelines",
        "Optimized for performance on large images",
      ],
      github: "https://github.com/awanishkrai",
    },
  ],
  certifications: [
    "Computer Communications – Coursera",
    "TCP/IP and Advanced Topics – Coursera",
    "Bits and Bytes of Computer Networking – Coursera",
    "Networking Specialization – Coursera",
  ],
  terminal: {
    commands: {
      whoami: "Awanish Kumar Rai",
      whoami_full: "Computer Science Undergraduate | Software Engineer",
      projects: "OS-Room-Booking-System | My-Bookings | AlgoPhoto",
      skills: "Python, C++, React, Django, PostgreSQL, MongoDB, and more...",
      socials:
        "GitHub: github.com/awanishkrai | LinkedIn: linkedin.com/in/awanish-rai-9296ab221",
      help: "Available commands: whoami, projects, skills, socials, clear, help, contact",
      contact: "Email: awanishrai420@gmail.com | Phone: +91-6283642238",
    },
  },
};
