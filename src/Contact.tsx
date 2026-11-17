import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { ME } from "./constants"

export function Footer() {
  const [visits, setVisits] = useState(324)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_visits")
      if (!stored) {
        localStorage.setItem("portfolio_visits", "324")
        setVisits(324)
      } else {
        const next = Math.max(324, parseInt(stored, 10) + 1)
        localStorage.setItem("portfolio_visits", String(next))
        setVisits(next)
      }
    } catch {
      setVisits(324)
    }
  }, [])

  return (
    <footer className="footer-bar">
      <div className="footer-left">
        <span className="footer-monogram">{ME.initials}</span>
        <span className="footer-item">© 2026 {ME.name}</span>
        <span className="footer-item">Built with React</span>
        <span className="footer-item">{visits} visits</span>
      </div>

      <div className="footer-right">
        <a
          href={ME.github}
          target="_blank"
          rel="noreferrer"
          className="footer-social-link"
          aria-label="GitHub profile"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href={ME.linkedin}
          target="_blank"
          rel="noreferrer"
          className="footer-social-link"
          aria-label="LinkedIn profile"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href={ME.twitter}
          target="_blank"
          rel="noreferrer"
          className="footer-social-link"
          aria-label="X (Twitter) profile"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a
          href={`mailto:${ME.email}`}
          className="footer-social-link"
          aria-label="Email Ankit"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </footer>
  )
}
