import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { getErrorMessage, getHistory } from '../services/api'

function badgeStyle(score) {
  if (score >= 70) return 'bg-green-100 text-green-800'
  if (score >= 40) return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800'
}

function HistoryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0) // increases when the user clicks "Try again"

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    getHistory()
      .then((data) => {
        if (!cancelled) setItems(data)
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
  }, [attempt])

  if (loading) return <LoadingSpinner message="Loading history..." />

  if (error) {
    return <ErrorMessage message={error} onRetry={() => setAttempt((n) => n + 1)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">History</h1>
        <Link
          to="/upload"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          New analysis
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-slate-600">No analyses yet.</p>
          <Link to="/upload" className="mt-2 inline-block text-sm font-medium text-blue-600 underline">
            Analyze your first resume
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={`/results/${item.id}`}
                className="flex items-center justify-between rounded-xl bg-white p-4 shadow transition-shadow hover:shadow-md"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-800">{item.filename}</p>
                  <p className="text-sm text-slate-500">
                    Analysis #{item.id} · {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`ml-4 shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${badgeStyle(item.match_score)}`}
                >
                  {item.match_score.toFixed(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}



export default HistoryPage;