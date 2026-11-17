import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelope,
  faPaperclip,
  faEye,
  faArrowUpRightFromSquare,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { ME } from "./constants"

const socials = [
  { icon: faGithub, label: "GitHub", href: ME.github },
  { icon: faLinkedin, label: "LinkedIn", href: ME.linkedin },
  { icon: faXTwitter, label: "Twitter", href: ME.twitter },
  { icon: faEnvelope, label: "Mail", href: `mailto:${ME.email}` },
  { icon: faPaperclip, label: "Resume", href: ME.resume },
]

const ROLES = [
  "Full-Stack Developer",
  "Backend Engineer",
]

function AnimatedRole() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % ROLES.length)
        setFade(true)
      }, 350)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <p className="hero-role">
      <span className={`hero-role-flipper ${fade ? "hero-role-flipper--visible" : "hero-role-flipper--hidden"}`}>
        {ROLES[index]}
      </span>
    </p>
  )
}

export function Hero() {
  const [views, setViews] = useState(0)

useEffect(() => {
  try {
    const stored = localStorage.getItem("portfolio_hero_views")
    const currentViews = stored ? Number(stored) : 0
    const updatedViews = currentViews + 1

    localStorage.setItem("portfolio_hero_views", String(updatedViews))
    setViews(updatedViews)
  } catch {
    setViews(0)
  }
}, [])
  return (
    <div className="hero" id="home">
      <div className="hero-banner">
        <img src="/background.jpg" alt="" aria-hidden="true" className="hero-banner-img" />
      </div>

      <div className="hero-dashed-line" />

      <div className="hero-profile-row">
        <div className="hero-avatar-wrap">
          <img src="/profile.png" alt={ME.name} className="hero-avatar" />
        </div>

        <div className="hero-identity">
          <div className="hero-symbol" aria-hidden="true">
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          </div>
          <h1 className="hero-name">{ME.name}</h1>
          <AnimatedRole />
          <p className="hero-location">{ME.age}, {ME.location}</p>
        </div>

        <div className="hero-views" title="Total profile views">
          <FontAwesomeIcon icon={faEye} />
          <span>{views.toLocaleString()}</span>
        </div>
      </div>

      <div className="hero-dashed-line" />

      <div className="hero-about" id="about">
        <h2 className="hero-section-title">About</h2>
        <ul className="hero-about-list">
          <li>
            Hey, I'm Ankit, a full stack developer who loves building clean, modern websites and apps where design,
            functionality, and even the smallest details matter, with a focus on making products that
            are both practical and visually satisfying.
          </li>
          <li>
            Currently pursuing B.Tech in AI &amp; Data Science at {ME.college}, maintaining an 8.1 CGPA and eager to build
            intelligent, production-ready systems.
          </li>
        </ul>
      </div>

      <div className="hero-dashed-line" />

      <div className="hero-contact" id="contact">
        <h2 className="hero-section-title">Contact</h2>
        <div className="hero-socials">
          {socials.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="hero-social-btn"
            >
              <span className="hero-social-icon-box">
                <FontAwesomeIcon icon={icon} />
              </span>
              <span className="hero-social-label">{label}</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="hero-social-arrow" />
            </a>
          ))}
        </div>
      </div>

      <div className="hero-dashed-line" />
    </div>
  )
}
