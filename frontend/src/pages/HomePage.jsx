import { useEffect, useState } from 'react'
import { checkHealth, getErrorMessage } from '../services/api'

function HomePage() {
  const [status, setStatus] = useState('checking') // checking | online | offline
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    checkHealth()
      .then(() => setStatus('online'))
      .catch((error) => {
        setStatus('offline')
        setErrorMessage(getErrorMessage(error))
      })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">AI Resume Analyzer</h1>
      <p className="mt-2 text-slate-600">
        Upload your resume and compare it with a job description.
      </p>

      {/* Temporary connection check. We remove it later. */}
      <div className="mt-6 inline-block rounded-lg bg-white px-4 py-2 shadow text-sm">
        {status === 'checking' && <span className="text-slate-500">Checking server...</span>}
        {status === 'online' && <span className="text-green-600">Server connected</span>}
        {status === 'offline' && <span className="text-red-600">{errorMessage}</span>}
      </div>
    </div>
  )
}

export default HomePage;