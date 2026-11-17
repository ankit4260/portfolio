export const ME = {
  name:            "Ankit Choudhary",
  initials:        "AC",
  role:            "Full-Stack Developer · Backend Engineer",
  tagline:         "Full-stack developer focused on shipping AI-powered web applications end to end.",
  location:        "Jaipur, Rajasthan, IND",
  age:             20,
  phone:           "+91-8502884260",
  email:           "ankit850288@gmail.com",

  college:         "JECRC Foundation, Jaipur",
  collegeSub:      "Engineering College & Research Centre",
  degree:          "B.Tech — Artificial Intelligence & Data Science",
  batch:           "2024 – 2028 (Expected)",
  cgpa:            "8.1 / 10",

  school12:        "Indrapratapsingh Sr. Sec. School, Jaipur",
  school12Board:   "Rajasthan Board of Secondary Education",
  school12Score:   "77.20%",
  school12Year:    "2023",

  school10:        "Indrapratapsingh Sr. Sec. School, Jaipur",
  school10Board:   "Rajasthan Board of Secondary Education",
  school10Score:   "92.83%",
  school10Year:    "2021",

  github:          "https://github.com/ankit4260",
  githubUsername:  "ankit4260",
  linkedin:        "https://www.linkedin.com/in/ankit4260",
  twitter:         "https://x.com/ankit4260",
  resume:          "https://drive.google.com/file/d/1sIyEZhFJyaOkGdHlyVlrcrHPm2bUwZxU/view?usp=sharing",
  codolio:         "https://codolio.com/profile/ankit4260",
  codolioUsername: "ankit4260",
}

export type Project = {
  title:       string
  tagline:     string
  description: string
  points?:     string[]
  tech:        string[]
  live?:       string
  github?:     string
  gradient:    [string, string]
  image?:      string
  featured?:   boolean
}

export const PROJECTS: Project[] = [
  {
    title:       "GrabPic – AI Event Photo Finder",
    tagline:     "Microservices face-recognition photo discovery platform",
    description: "Attendees upload one selfie and instantly receive a gallery of every event photo they appear in, eliminating manual search through shared Drive links. Engineered a FastAPI service to extract 512-D face embeddings matched via cosine similarity.",
    points: [
      "Engineered FastAPI face-recognition service using 512-D embeddings with cosine similarity.",
      "Designed Express.js REST APIs with JWT auth and bcrypt on PostgreSQL; integrated Cloudinary storage with local fallback.",
      "Implemented concurrency-limited batch pipeline (3 parallel AI tasks) with per-photo error isolation for bulk uploads of 50+ photos."
    ],
    tech:        ["React", "Node.js", "FastAPI", "PostgreSQL", "Cloudinary"],
    github:      "https://github.com/ankit4260",
    live:        "https://grab-pic-xi.vercel.app/",
    gradient:    ["#10b981", "#059669"],
    image:       "/projects/grabpic.png",
    featured:    true,
  },
  {
    title:       "RTU SGPA Calculator",
    tagline:     "Automated marksheet PDF parser & percentage engine",
    description: "Automated marksheet PDF parser & percentage engine for Rajasthan Technical University students. Drag and drop semester result PDFs to instantly calculate SGPA, CGPA, and percentage breakdowns.",
    points: [
      "Parses RTU marksheet PDFs automatically to extract subject-wise marks and credits.",
      "Calculates SGPA, CGPA, and percentage with accurate grade-point mapping for RTU grading scheme.",
    ],
    tech:        ["TypeScript", "React", "Tailwind CSS", "Vite"],
    github:      "https://github.com/ankit4260/rtu-sgpa-calculator",
    live:        "https://ankit4260.github.io/rtu-sgpa-calculator/",
    gradient:    ["#3b82f6", "#1d4ed8"],
    image:       "/projects/rtu-sgpa.jpg",
    featured:    false,
  },
  {
    title:       "CSV Parser – AI CRM Data Importer",
    tagline:     "Intelligent LLM-driven schema mapping & batch importer",
    description: "Built a three-step flow (upload, preview, transform) converting arbitrary CSV files into structured CRM schemas using Google Gemini API for intelligent column mapping with exponential backoff and duplicate filtering.",
    points: [
      "Three-step flow converting arbitrary CSV files into structured CRM schema using Google Gemini API.",
      "Batch processing with exponential-backoff retries, duplicate email/phone detection, and invalid-record filtering."
    ],
    tech:        ["React", "Node.js", "Express.js", "Multer", "Gemini API"],
    github:      "https://github.com/ankit4260",
    live:        "https://csv-parser-xi.vercel.app/",
    gradient:    ["#6366f1", "#8b5cf6"],
    image:       "/projects/csv-parser.png",
    featured:    true,
  },
  {
    title:       "RIPWallet – Expense Tracker",
    tagline:     "Full-stack personal finance application with analytics",
    description: "Developed a personal finance web app with JWT cookie-based authentication and RESTful CRUD APIs using Express.js and MongoDB/Mongoose. Built a Chart.js dashboard visualizing income, expenses, and balance trends.",
    points: [
      "Full-stack personal finance app with JWT cookie-based auth and RESTful APIs with MongoDB/Mongoose.",
      "Interactive Chart.js analytics dashboard visualizing income, expenses, balance trends, and category distribution."
    ],
    tech:        ["Node.js", "Express.js", "MongoDB", "JWT", "Chart.js"],
    github:      "https://github.com/ankit4260",
    live:        "https://rip-wallet.onrender.com/",
    gradient:    ["#f59e0b", "#d97706"],
    image:       "/projects/ripwallet.jpg",
    featured:    false,
  },
]

export const ACHIEVEMENTS = [
  {
    title:       "CodeChef JavaScript Skill Test",
    subtitle:    "Scored 2525 / 2900 (87%)",
    year:        "2024",
  },
  {
    title:       "2nd Position — Subotto, Renaissance 2025",
    subtitle:    "Organized by JECRC Foundation",
    year:        "2025",
  },
  {
    title:       "Prasunethon 2.0 Hackathon 2026 — Round 2",
    subtitle:    "GrabPic selected for Round 2 as Team Rhydham",
    year:        "2026",
  },
]
