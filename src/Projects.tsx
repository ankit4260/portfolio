import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faXmark,
  faCheck,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { PROJECTS, type Project } from "./constants"

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: Project
  index: number
  onOpenDetails: (project: Project) => void
}) {
  const [from, to] = project.gradient

  return (
    <article className="sam-project-card">
      {/* ── Visual Preview — gradient bg + device mockup ── */}
      <div
        className="sam-project-cover"
        style={{ background: `linear-gradient(140deg, ${from}ee, ${to})` }}
      >
        {project.image ? (
          /* Laptop / MacBook-style device frame */
          <div className="project-device-mockup">
            {/* Top bezel with camera dot */}
            <div className="project-device-bezel">
              <span className="project-device-camera" />
            </div>
            {/* Screen area */}
            <div className="project-device-screen">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="project-device-img"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          /* Fallback mock window */
          <div className="sam-mock-window">
            <div className="sam-mock-header">
              <span className="sam-mock-dot sam-mock-dot--red" />
              <span className="sam-mock-dot sam-mock-dot--yellow" />
              <span className="sam-mock-dot sam-mock-dot--green" />
              <div className="sam-mock-searchbar">{project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.app</div>
            </div>
            <div className="sam-mock-body">
              <div className="sam-mock-badge" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="sam-mock-headline">{project.tagline}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Content Body ── */}
      <div className="sam-project-body">
        {/* Title row: Title on left, [Globe] [GitHub] below image on top right */}
        <div className="sam-project-title-row">
          <h3 className="sam-project-title">{project.title}</h3>

          <div className="sam-project-top-icons">
            {project.live && project.live !== "#" ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="sam-top-icon-btn"
                aria-label={`${project.title} live website`}
                title="Live Website"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            ) : (
              <span
                className="sam-top-icon-btn sam-top-icon-btn--muted"
                title="Live demo link"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </span>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="sam-top-icon-btn"
                aria-label={`${project.title} GitHub repository`}
                title="GitHub Repository"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
          </div>
        </div>

        {/* Subtitle */}
        <p className="sam-project-tagline">{project.tagline}</p>

        {/* Description */}
        <p className="sam-project-desc">{project.description}</p>

        {/* Bottom row: Tech tags on left, [ Details ↗ ] button on right */}
        <div className="sam-project-bottom-row">
          <div className="sam-project-tags">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="sam-project-tag">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="sam-project-tag sam-project-tag--more">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* Details button with arrow */}
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="sam-project-details-btn"
            aria-label={`View ${project.title} details`}
          >
            <span>Details</span>
            <span className="sam-details-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section className="projects-section" id="projects">
      {/* ── Section Header with Serif title + View all ↗ ── */}
      <div className="projects-header-row">
        <h2 className="projects-title">Projects</h2>
        <a
          href="https://github.com/ankit4260?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="projects-view-all-link"
        >
          View all ↗
        </a>
      </div>

      <div className="projects-dashed-divider" />

      {/* ── 2-column Grid matching Samworks ── */}
      <div className="sam-projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            onOpenDetails={setSelectedProject}
          />
        ))}
      </div>

      <div className="projects-dashed-divider" />

      {/* ── Project Details Modal ── */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-card" onClick={e => e.stopPropagation()}>
            <div className="project-modal-header">
              <div>
                <h3 className="project-modal-title">{selectedProject.title}</h3>
                <p className="project-modal-tagline">{selectedProject.tagline}</p>
              </div>
              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close details"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="project-modal-body">
              <p className="project-modal-desc">{selectedProject.description}</p>

              {selectedProject.points && (
                <div className="project-modal-points">
                  <h4 className="project-modal-subtitle">Key Engineering Highlights:</h4>
                  <ul>
                    {selectedProject.points.map((pt, idx) => (
                      <li key={idx}>
                        <FontAwesomeIcon icon={faCheck} className="project-modal-check" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-modal-tech-wrap">
                <h4 className="project-modal-subtitle">Technologies:</h4>
                <div className="sam-project-tags">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="sam-project-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-modal-footer">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-modal-btn project-modal-btn--primary"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  Open GitHub Repository
                </a>
              )}
              {selectedProject.live && selectedProject.live !== "#" && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noreferrer"
                  className="project-modal-btn project-modal-btn--secondary"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
