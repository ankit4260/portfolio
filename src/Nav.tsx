import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { ME } from "./constants"

type NavProps = {
  theme: string
  onToggle: () => void
}

const mainLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
]

const moreLinks = [
  { label: "Technical Skills", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Coding Activity", href: "#coding-activity" },
  { label: "GitHub Activity", href: "#github-activity" },
  { label: "A Thought for Today", href: "#thought" },
  { label: "View Resume", href: ME.resume, external: true },
]

export function Nav({ theme, onToggle }: NavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 250)
  }

  const handleToggle = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(prev => !prev)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setDropdownOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <nav className="nav">
      <a href="#home" className="nav-logo" aria-label={ME.name}>
        {ME.initials}
      </a>

      <div className="nav-links">
        {mainLinks.map(link => (
          <a key={link.label} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}

        <div
          className="nav-dropdown"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`nav-link nav-link--more ${dropdownOpen ? "nav-link--active" : ""}`}
            onClick={handleToggle}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span>More</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`nav-chevron ${dropdownOpen ? "nav-chevron--rotated" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div
              className="nav-dropdown-menu"
              role="menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {moreLinks.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  onClick={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    setDropdownOpen(false)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        className="nav-toggle"
        onClick={onToggle}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
      </button>
    </nav>
  )
}
