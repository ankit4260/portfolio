import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap, faSchool, faMedal } from "@fortawesome/free-solid-svg-icons"
import { ME } from "./constants"

type EduItem = {
  icon: typeof faGraduationCap
  institution: string
  sub?: string
  detail: string
  period: string
  grade: string
  gradeLabel: string
  current?: boolean
}

const education: EduItem[] = [
  {
    icon:        faGraduationCap,
    institution: ME.college,
    sub:         ME.collegeSub,
    detail:      ME.degree,
    period:      ME.batch,
    grade:       ME.cgpa,
    gradeLabel:  "CGPA",
    current:     true,
  },
  {
    icon:        faSchool,
    institution: ME.school12,
    detail:      `12th (Science) · ${ME.school12Board}`,
    period:      ME.school12Year,
    grade:       ME.school12Score,
    gradeLabel:  "Score",
    current:     false,
  },
  {
    icon:        faSchool,
    institution: ME.school10,
    detail:      `10th · ${ME.school10Board}`,
    period:      ME.school10Year,
    grade:       ME.school10Score,
    gradeLabel:  "Score",
    current:     false,
  },
]

function EduCard({ item }: { item: EduItem }) {
  return (
    <div className={`edu-card ${item.current ? "edu-card--current" : ""}`}>
      <div className="edu-icon-wrap">
        <FontAwesomeIcon icon={item.icon} className="edu-icon" />
      </div>

      <div className="edu-body">
        <div className="edu-header-row">
          <div>
            <h3 className="edu-institution">{item.institution}</h3>
            {item.sub && <span className="edu-sub">{item.sub}</span>}
          </div>
          {item.current && (
            <span className="edu-current-badge">Current</span>
          )}
        </div>
        <p className="edu-detail">{item.detail}</p>
        <div className="edu-footer-row">
          <span className="edu-period">{item.period}</span>
          <span className="edu-grade">
            <FontAwesomeIcon icon={faMedal} style={{ fontSize: 11, opacity: 0.7 }} />
            &nbsp;{item.gradeLabel}: <strong>{item.grade}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}

export function Education() {
  return (
    <section className="edu-section section" id="education">
      <div className="section-header">
        <span className="section-index">04</span>
        <h2 className="section-title">Education</h2>
      </div>

      <div className="edu-list">
        {education.map((item, i) => (
          <EduCard key={i} item={item} />
        ))}
      </div>
    </section>
  )
}
