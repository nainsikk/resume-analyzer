import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import ScoreGauge from '../components/ScoreGauge'  // NEW
import SkillChips from '../components/SkillChips'
import SkillsChart from '../components/SkillsChart'  // NEW
import { getAnalysis, getErrorMessage } from '../services/api'

function ResultsPage() {
  const { id } = useParams()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    getAnalysis(id)
      .then((data) => {
        if (!cancelled) setAnalysis(data)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, attempt])

  if (loading) return <LoadingSpinner message="Loading your results..." />

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} onRetry={() => setAttempt((n) => n + 1)} />
        <Link to="/upload" className="text-sm font-medium text-blue-600 underline">
          Analyze a resume
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Analysis results</h1>
        <Link
          to="/upload"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Analyze another
        </Link>
      </div>

      {/* NEW: gauges replace the plain number cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ScoreGauge label="Match score" value={analysis.match_score} suffix=" / 100" />
        {analysis.semantic_similarity != null ? (
          <ScoreGauge
            label="Semantic similarity"
            value={analysis.semantic_similarity}
            suffix="%"
          />
        ) : (
          <div className="rounded-xl bg-white p-6 shadow text-center">
            <p className="text-sm text-slate-500">Semantic similarity</p>
            <p className="mt-6 text-3xl font-bold text-slate-400">N/A</p>
          </div>
        )}
      </div>

      {/* NEW: skills chart, then the chips */}
      <SkillsChart
        matchedCount={analysis.matched_skills.length}
        missingCount={analysis.missing_skills.length}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SkillChips
          title="Matched skills"
          skills={analysis.matched_skills}
          color="green"
          emptyText="No matching skills were found."
        />
        <SkillChips
          title="Missing skills"
          skills={analysis.missing_skills}
          color="red"
          emptyText="No missing skills. Great match!"
        />
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="font-semibold text-slate-800">Suggestions</h2>
        {analysis.suggestions.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No suggestions for this resume.</p>
        ) : (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Analysis #{analysis.id}, created {new Date(analysis.created_at).toLocaleString()}
      </p>
    </div>
  )
}

export default ResultsPage;