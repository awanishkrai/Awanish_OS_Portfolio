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
      github: "https://github.com/awanishkrai/Booking_System_API",
      readme: "# Booking_System_API\n",
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
      github: "https://github.com/awanishkrai/Scalable-Booking-System",
      readme: "# OptiBook - Interview-Ready Booking System\n\nA production-grade, scalable booking system built with **MERN stack** + **Python scheduler microservice**, featuring real-time updates, MongoDB transactions, Redis caching, and comprehensive monitoring.\n\n📄 **[View Complete Project Report](./PROJECT_REPORT.md)** - Detailed architecture, API docs, and scalability analysis.\n\n## 🎯 Key Interview-Worthy Features\n\n| Feature | Implementation |\n|---------|----------------|\n| **Zero Double-Bookings** | MongoDB ACID transactions with optimistic locking |\n| **Sub-100ms Queries** | Redis caching with smart invalidation |\n| **Horizontal Scaling** | Nginx LB + multiple backend instances + Socket.io Redis adapter |\n| **Real-time Updates** | WebSocket with JWT auth across all instances |\n| **Password Recovery** | Secure token-based email reset flow |\n| **Booking Rescheduling** | Atomic slot swap with transaction |\n\n## 🚀 Quick Start\n\n### Prerequisites\n- Node.js 18+\n- Python 3.8+\n- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))\n- Redis (local or cloud)\n\n### Development Setup\n\n```bash\n# 1. Clone and setup environment\ncp .env.example .env\n# Edit .env with your MongoDB Atlas URI\n\n# 2. Install & start backend\ncd backend\nnpm install\nnpm run dev\n\n# 3. Start scheduler (new terminal)\ncd scheduler\nnpm install\nnpm run dev\n\n# 4. Start frontend (new terminal)\ncd frontend\nnpm install\nnpm run dev\n```\n\n### Docker Setup (Recommended)\n\n```bash\ndocker-compose up -d\n```\n\nAccess at: http://localhost:5173\n\n## 🏗️ Architecture\n\n```\n┌─────────────┐     ┌─────────────────┐     ┌──────────────┐\n│   Frontend  │────▶│  Backend API    │────▶│  Scheduler   │\n│   (React)   │◀────│  (Express)      │◀────│  (Python)    │\n└─────────────┘     └────────┬────────┘     └──────┬───────┘\n                             │                      │\n                    ┌────────▼────────┐    ┌───────▼───────┐\n                    │    MongoDB      │    │    Redis      │\n                    │  (Transactions) │    │   (Queue)     │\n                    └─────────────────┘    └───────────────┘\n```\n\n## 💡 Interview Talking Points\n\n| Topic | What to Highlight |\n|-------|-------------------|\n| **Concurrency** | MongoDB transactions prevent double-booking with atomic slot updates |\n| **Microservices** | Scheduler is independently deployable; HTTP communication with retry logic |\n| **Caching** | Redis write-through cache for <100ms availability queries |\n| **Real-time** | Socket.io with auto-reconnect and room-based updates |\n| **Reliability** | Exponential backoff retry, Dead Letter Queue for failed requests |\n| **Security** | JWT rotation, rate limiting (100 req/15min), input validation |\n| **Observability** | Structured Winston logs, health checks, audit trail with TTL |\n| **DevOps** | Docker Compose orchestration, horizontal scaling ready |\n\n## 📊 API Endpoints\n\n| Endpoint | Method | Auth | Description |\n|----------|--------|------|-------------|\n| `/api/auth/register` | POST | - | Register user |\n| `/api/auth/login` | POST | - | Login |\n| `/api/bookings` | POST | ✓ | Create booking (transactional) |\n| `/api/bookings/:userId` | GET | ✓ | Get user bookings |\n| `/api/bookings/:id` | DELETE | ✓ | Cancel booking |\n| `/api/availability` | GET | - | Get slots (Redis cached) |\n| `/api/admin/slots` | POST | Admin | Create slot |\n| `/api/admin/analytics` | GET | Admin | Dashboard analytics |\n| `/health` | GET | - | Service health check |\n\n## 🧪 Testing\n\n```bash\n# Backend tests\ncd backend && npm test\n\n# Scheduler tests\ncd scheduler && npm test\n\n# Concurrency test (proves no double-booking)\ncd backend && npm run test:concurrency\n```\n\n## 📁 Project Structure\n\n```\n├── backend/          # Node.js + Express API\n│   ├── src/\n│   │   ├── config/   # DB, Redis, JWT config\n│   │   ├── models/   # Mongoose schemas\n│   │   ├── routes/   # Express routers\n│   │   ├── controllers/\n│   │   ├── middleware/\n│   │   ├── services/ # Redis, Scheduler client\n│   │   └── socket/   # WebSocket handlers\n├── frontend/         # React + Vite + Tailwind\n│   └── src/\n│       ├── components/\n│       ├── pages/\n│       ├── context/  # Auth, Socket contexts\n│       └── services/ # API client\n├── scheduler/        # Node.js Express microservice\n│   └── src/\n│       ├── algorithms/   # FCFS, SJF, Priority\n│       ├── queueManager.js\n│       └── app.js\n└── docker-compose.yml\n```\n\n## 🔑 Key Technical Decisions\n\n### 1. MongoDB Transactions for Atomic Bookings\n```javascript\nconst session = await mongoose.startSession();\nsession.startTransaction();\n// Atomic slot decrement + booking creation\nawait session.commitTransaction();\n```\n\n### 2. Redis Write-Through Caching\n- Cache invalidation on every booking/cancellation\n- 60-second TTL for availability data\n- Fallback to MongoDB on cache miss\n\n### 3. Scheduler Algorithm Selection\n- **FCFS**: Default, fair ordering\n- **SJF**: Optimize for shorter bookings\n- **Priority**: VIP user preferential access\n\n## 📝 License\n\nMIT\n\n# Scalable-Booking-System\n",
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
