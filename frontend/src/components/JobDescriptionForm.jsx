import { useState } from 'react'

const MIN_LENGTH = 20      // same rule as the backend
const MAX_LENGTH = 10000   // same rule as the backend

function JobDescriptionForm({ onSubmit, loading = false }) {
  const [text, setText] = useState('')

  const trimmedLength = text.trim().length
  const tooShort = trimmedLength < MIN_LENGTH
  const canSubmit = !tooShort && !loading

  function handleSubmit() {
    if (canSubmit) onSubmit(text.trim())
  }

  return (
    <div className="space-y-3 rounded-xl bg-white p-6 shadow">
      <label htmlFor="job-description" className="block font-medium text-slate-800">
        Paste the job description
      </label>

      <textarea
        id="job-description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={MAX_LENGTH}
        disabled={loading}
        rows={10}
        placeholder="Paste the full job description here..."
        className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 focus:border-blue-500 focus:outline-none disabled:bg-slate-100"
      />

      <div className="flex items-center justify-between">
        <p className={`text-sm ${tooShort && trimmedLength > 0 ? 'text-red-600' : 'text-slate-500'}`}>
          {tooShort
            ? `At least ${MIN_LENGTH} characters needed (${trimmedLength} so far)`
            : `${trimmedLength} / ${MAX_LENGTH} characters`}
        </p>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Analyze
        </button>
      </div>
    </div>
  )
}

export default JobDescriptionForm;