/**
 * Stack — Tech Stack section.
 * Matches Samworks design:
 * - Serif heading + "( hover to play )"
 * - Interactive category filter tabs (All, Frontend, Backend, AI & ML, Tools)
 * - Playful interactive pills with icons and bounce/tilt on hover
 */
import { useState } from "react"
import {
  siJavascript,
  siTypescript,
  siPython,
  siCplusplus,
  siReact,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siFastapi,
  siMongodb,
  siPostgresql,
  siJsonwebtokens,
  siGit,
  siGithub,
  siPostman,
  siCloudinary,
  siRender,
  siVercel,
} from "simple-icons"

type Category = "All" | "Frontend" | "Backend" | "AI & ML" | "Tools"

type TechItem = {
  name: string
  categories: Category[]
  si?: { path: string; hex: string }
}

const CATEGORIES: Category[] = ["All", "Frontend", "Backend", "AI & ML", "Tools"]

const stack: TechItem[] = [
  // Frontend
  { name: "JavaScript",     categories: ["Frontend", "Backend"], si: siJavascript },
  { name: "TypeScript",     categories: ["Frontend", "Backend"], si: siTypescript },
  { name: "React",          categories: ["Frontend"],            si: siReact },
  { name: "Tailwind CSS",   categories: ["Frontend"],            si: siTailwindcss },

  // Backend & Databases
  { name: "Node.js",        categories: ["Backend"],             si: siNodedotjs },
  { name: "Express.js",     categories: ["Backend"],             si: siExpress },
  { name: "FastAPI",        categories: ["Backend", "AI & ML"],  si: siFastapi },
  { name: "Python",         categories: ["Backend", "AI & ML"],  si: siPython },
  { name: "C++",            categories: ["Backend"],             si: siCplusplus },
  { name: "MongoDB",        categories: ["Backend"],             si: siMongodb },
  { name: "PostgreSQL",     categories: ["Backend"],             si: siPostgresql },
  { name: "JWT & RBAC",     categories: ["Backend"],             si: siJsonwebtokens },

  // Tools & Deployment
  { name: "Git",            categories: ["Tools"],               si: siGit },
  { name: "GitHub",         categories: ["Tools"],               si: siGithub },
  { name: "Postman",        categories: ["Tools"],               si: siPostman },
  { name: "Cloudinary",     categories: ["Tools", "Backend"],    si: siCloudinary },
  { name: "Render",         categories: ["Tools"],               si: siRender },
  { name: "Vercel",         categories: ["Tools"],               si: siVercel },
]

/** SVG icon rendered in monochrome style matching Samworks */
function TechIcon({ item }: { item: TechItem }) {
  if (item.si) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="stack-pill-icon"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={item.si.path} />
      </svg>
    )
  }
  return <span className="stack-pill-fallback">{item.name.slice(0, 2)}</span>
}

export function Stack() {
  const [activeTab, setActiveTab] = useState<Category>("All")

  const filteredItems = activeTab === "All"
    ? stack
    : stack.filter(item => item.categories.includes(activeTab))

  return (
    <section className="stack-section" id="stack">
      {/* ── Header with Serif Title + Category Tabs ── */}
      <div className="stack-header-row">
        <h2 className="stack-title">Tech Stack</h2>

        {/* Filter Pills */}
        <div className="stack-tabs">
          {CATEGORIES.map(category => {
            const isActive = activeTab === category
            return (
              <button
                key={category}
                type="button"
                className={`stack-tab-btn ${isActive ? "stack-tab-btn--active" : ""}`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      <div className="stack-dashed-divider" />

      {/* ── Staggered interactive pills ── */}
      <div className="stack-pills-wrap">
        {filteredItems.map(item => (
          <div key={item.name} className="stack-pill">
            <TechIcon item={item} />
            <span className="stack-pill-name">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="stack-dashed-divider" />
    </section>
  )
}
