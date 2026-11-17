import { useMemo, useState } from "react"

export type YearMode = "2026" | "2025" | "last12"

type HeatmapProps = {
  contributions: Record<string, number>
  loading: boolean
  error: string | null
  unit?: string
  serviceName: "Codolio" | "GitHub"
  syncLabel: string
  platformsNote?: string
  fallbackStats?: {
    [key in YearMode]: { activeDays: number; totalCount: number }
  }
}

const YEAR_OPTIONS: { key: YearMode; label: string }[] = [
  { key: "2026", label: "2026" },
  { key: "2025", label: "2025" },
  { key: "last12", label: "Last 12 Mo" },
]

function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (!count || count === 0) return 0
  if (count < 4) return 1
  if (count < 7) return 2
  if (count < 10) return 3
  return 4
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""]

function formatDate(d: Date): string {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

function buildYearWeeks(year: number): Date[][] {
  const start = new Date(year, 0, 1)
  const dow = start.getDay()
  const toMonday = (dow + 6) % 7
  start.setDate(start.getDate() - toMonday)

  const end = new Date(year, 11, 31)
  const weeks: Date[][] = []
  const cur = new Date(start)

  while (cur <= end || cur.getDay() !== 1) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cur))
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
    if (cur > end && cur.getDay() === 1) break
  }
  return weeks
}

function buildRollingWeeks(): Date[][] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  const dow = start.getDay()
  const toMonday = (dow + 6) % 7
  start.setDate(start.getDate() - toMonday)

  const weeks: Date[][] = []
  const cur = new Date(start)
  while (cur <= today || weeks.length < 52) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cur))
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
    if (weeks.length >= 53) break
  }
  return weeks
}

export function Heatmap({
  contributions,
  loading,
  error,
  unit = "contribution",
  serviceName,
  syncLabel,
  platformsNote,
  fallbackStats,
}: HeatmapProps) {
  const [yearMode, setYearMode] = useState<YearMode>("2026")
  const [hoverText, setHoverText] = useState<string | null>(null)

  const weeks = useMemo(() => {
    if (yearMode === "2026") return buildYearWeeks(2026)
    if (yearMode === "2025") return buildYearWeeks(2025)
    return buildRollingWeeks()
  }, [yearMode])

  const monthLabels: string[] = useMemo(() => {
    return weeks.map((week, i) => {
      const firstDay = week[0]
      if (i === 0) return MONTH_NAMES[firstDay.getMonth()]
      const prevFirst = weeks[i - 1][0]
      if (firstDay.getMonth() !== prevFirst.getMonth()) {
        return MONTH_NAMES[firstDay.getMonth()]
      }
      return ""
    })
  }, [weeks])

  const { activeDays, totalCount } = useMemo(() => {
    let days = 0
    let total = 0
    const todayStr = toISODate(new Date())

    Object.entries(contributions).forEach(([dateStr, count]) => {
      let inRange = false
      if (yearMode === "2026") {
        inRange = dateStr.startsWith("2026")
      } else if (yearMode === "2025") {
        inRange = dateStr.startsWith("2025")
      } else {
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
        inRange = dateStr >= toISODate(oneYearAgo) && dateStr <= todayStr
      }

      if (inRange && count > 0) {
        days++
        total += count
      }
    })

    const fb = fallbackStats?.[yearMode]
    const finalDays = days > 0 ? days : (fb?.activeDays ?? 0)
    const finalTotal = total > 0 ? total : (fb?.totalCount ?? 0)

    return { activeDays: finalDays, totalCount: finalTotal }
  }, [contributions, yearMode, fallbackStats])

  const summaryText = useMemo(() => {
    const yearLabel = yearMode === "last12" ? "the last 12 months" : yearMode
    if (serviceName === "Codolio") {
      const extra = platformsNote ? ` across ${platformsNote}` : ""
      return `Live Codolio activity · ${activeDays} active days · ${totalCount} submissions in ${yearLabel}${extra}`
    }
    return `Live GitHub activity · ${activeDays} active days · ${totalCount} contributions in ${yearLabel}`
  }, [serviceName, activeDays, totalCount, yearMode, platformsNote])

  if (error) {
    return (
      <div className="activity-card">
        <div className="heatmap-card-header">
          <div className="heatmap-sync-status">
            <span className="heatmap-pulse-dot" />
            <span className="heatmap-sync-label">{syncLabel}</span>
          </div>
        </div>
        <div className="heatmap-placeholder">
          <span>⚠ {error}</span>
        </div>
      </div>
    )
  }

  const today = new Date()
  today.setHours(23, 59, 59, 999)

  return (
    <div className="activity-card">
      <div className="heatmap-card-header">
        <div className="heatmap-sync-status">
          <span className="heatmap-pulse-dot" />
          <span className="heatmap-sync-label">{syncLabel}</span>
        </div>

        <div className="heatmap-year-tabs" role="tablist">
          {YEAR_OPTIONS.map(opt => {
            const isActive = yearMode === opt.key
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`heatmap-year-btn ${isActive ? "heatmap-year-btn--active" : ""}`}
                onClick={() => setYearMode(opt.key)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="heatmap-wrap" style={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.2s" }}>
        <div className="heatmap">
          <div className="heatmap-day-labels" aria-hidden="true">
            {DAY_LABELS.map((label, i) => (
              <span key={i} className="heatmap-day-label">
                {label}
              </span>
            ))}
          </div>

          <div className="heatmap-grid-wrap">
            <div className="heatmap-month-row" aria-hidden="true">
              {monthLabels.map((m, i) => (
                <span key={i} className="heatmap-month-label">
                  {m}
                </span>
              ))}
            </div>

            <div className="heatmap-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="heatmap-week">
                  {week.map((day, di) => {
                    const dateStr = toISODate(day)
                    const count = contributions[dateStr] ?? 0
                    const level = getLevel(count)
                    const isFuture = day > today
                    const formatted = formatDate(day)

                    const targetYear = yearMode === "2025" ? 2025 : 2026
                    const isOtherYear = yearMode !== "last12" && day.getFullYear() !== targetYear

                    if (isOtherYear) {
                      return <div key={di} className="heatmap-cell heatmap-cell--empty" />
                    }

                    return (
                      <div
                        key={di}
                        className={`heatmap-cell heatmap-cell--l${isFuture ? 0 : level}`}
                        data-level={isFuture ? 0 : level}
                        onMouseEnter={() => {
                          if (isFuture) {
                            setHoverText(`No ${unit}s on ${formatted}`)
                          } else if (count === 0) {
                            setHoverText(`No ${unit}s on ${formatted}`)
                          } else {
                            setHoverText(`${count} ${unit}${count === 1 ? "" : "s"} on ${formatted}`)
                          }
                        }}
                        onMouseLeave={() => setHoverText(null)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="heatmap-footer">
        <span className="heatmap-status">{hoverText ?? summaryText}</span>

        <div className="heatmap-legend" aria-label="Contribution scale">
          <span className="heatmap-legend-label">Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <span key={l} className={`heatmap-legend-cell heatmap-cell--l${l}`} />
          ))}
          <span className="heatmap-legend-label">More</span>
        </div>
      </div>
    </div>
  )
}
