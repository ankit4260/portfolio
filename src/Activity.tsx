import { useEffect, useState } from "react"
import { Heatmap } from "./Heatmap"
import { ME } from "./constants"

type ContribMap = Record<string, number>

function useGitHubActivity(username: string) {
  const [data,    setData]    = useState<ContribMap>({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!username) { setLoading(false); return }
    let alive = true
    const PRIMARY  = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=all`
    const FALLBACK = `https://github-contributions.vercel.app/api/v1/${encodeURIComponent(username)}`

    async function fetchData() {
      try {
        const tryFetch = async (url: string) => {
          const r = await fetch(url)
          if (!r.ok) throw new Error(`HTTP ${r.status}`)
          return r.json()
        }

        let json: { contributions?: { date: string; count: number }[] }
        try { json = await tryFetch(PRIMARY) }
        catch { json = await tryFetch(FALLBACK) }

        if (!alive) return
        const map: ContribMap = {}
        ;(json.contributions ?? []).forEach(({ date, count }) => { map[date] = count })
        setData(map)
      } catch {
        if (alive) setError("GitHub activity temporarily unavailable.")
      } finally {
        if (alive) setLoading(false)
      }
    }

    fetchData()
    return () => { alive = false }
  }, [username])

  return { data, loading, error }
}

function useCodolioActivity(username: string) {
  const [data,    setData]    = useState<ContribMap>({})
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!username) { setLoading(false); return }
    let alive = true

    fetch(`https://api.codolio.com/profile?userKey=${encodeURIComponent(username)}`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(json => {
        if (!alive) return
        const profiles = json?.data?.platformProfiles?.platformProfiles ?? []
        const map: ContribMap = {}
        profiles.forEach((p: { dailyActivityStatsResponse?: { submissionCalendar?: Record<string, number> } }) => {
          Object.entries(p.dailyActivityStatsResponse?.submissionCalendar ?? {}).forEach(
            ([ts, count]) => {
              const date = new Date(Number(ts) * 1000).toISOString().split("T")[0]
              map[date] = (map[date] ?? 0) + Number(count)
            }
          )
        })
        setData(map)
      })
      .catch(() => { if (alive) setError("Codolio data temporarily unavailable.") })
      .finally(() => { if (alive) setLoading(false) })

    return () => { alive = false }
  }, [username])

  return { data, loading, error }
}

export function Activity() {
  const gh = useGitHubActivity(ME.githubUsername)
  const cd = useCodolioActivity(ME.codolioUsername)

  return (
    <>
      <section className="activity-section section" id="coding-activity">
        <div className="section-header">
          <span className="section-index">05</span>
          <h2 className="section-title">Coding activity</h2>
        </div>
        <div className="activity-sub-row">
          <span className="activity-sub-text">
            Live activity aggregated from your connected Codolio platforms.
          </span>
          <a
            href={ME.codolio}
            target="_blank"
            rel="noreferrer"
            className="activity-sub-link"
          >
            Open Codolio profile ↗
          </a>
        </div>

        <Heatmap
          contributions={cd.data}
          loading={cd.loading}
          error={cd.error}
          serviceName="Codolio"
          syncLabel="Codolio Sync · LeetCode, Codeforces, CodeChef & GeeksforGeeks"
          platformsNote="4 synced platforms"
          unit="submission"
          fallbackStats={{
            "2026":   { activeDays: 224, totalCount: 769 },
            "2025":   { activeDays: 148, totalCount: 482 },
            "last12": { activeDays: 224, totalCount: 769 },
          }}
        />
      </section>

      <section className="activity-section section" id="github-activity">
        <div className="section-header">
          <span className="section-index">06</span>
          <h2 className="section-title">GitHub activity</h2>
        </div>
        <div className="activity-sub-row">
          <span className="activity-sub-text">
            Live open source contributions and commits synced directly from GitHub.
          </span>
          <a
            href={ME.github}
            target="_blank"
            rel="noreferrer"
            className="activity-sub-link"
          >
            GitHub profile ↗
          </a>
        </div>

        <Heatmap
          contributions={gh.data}
          loading={gh.loading}
          error={gh.error}
          serviceName="GitHub"
          syncLabel={`GitHub Sync · @${ME.githubUsername}`}
          unit="contribution"
          fallbackStats={{
            "2026":   { activeDays: 33, totalCount: 70 },
            "2025":   { activeDays: 1,  totalCount: 1 },
            "last12": { activeDays: 33, totalCount: 70 },
          }}
        />
      </section>
    </>
  )
}
