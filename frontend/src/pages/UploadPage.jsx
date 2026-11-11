import { useState } from 'react'
import { useNavigate } from 'react-router-dom'  // NEW
import FileDropzone from '../components/FileDropzone'
import JobDescriptionForm from '../components/JobDescriptionForm'  // NEW
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { analyzeResume, getErrorMessage, uploadResume } from '../services/api'  // NEW: analyzeResume

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function UploadPage() {
  const navigate = useNavigate()  // NEW: lets us change the page from code
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)  // NEW
  const [error, setError] = useState('')
  const [uploaded, setUploaded] = useState(null)

  function handleFileAccepted(selectedFile) {
    setFile(selectedFile)
    setError('')
  }

  function handleFileRejected(message) {
    setFile(null)
    setError(message)
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const data = await uploadResume(file)
      setUploaded(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setUploading(false)
    }
  }

  // NEW: send the resume ID and job description to the backend
  async function handleAnalyze(jobDescription) {
    setAnalyzing(true)
    setError('')
    try {
      const analysis = await analyzeResume(uploaded.resume_id, jobDescription)
      navigate(`/results/${analysis.id}`)
    } catch (err) {
      setError(getErrorMessage(err))
      setAnalyzing(false)
    }
  }

  function handleReset() {
    setFile(null)
    setUploaded(null)
    setError('')
  }

  // ----- After a successful upload: show the job description form -----
  if (uploaded) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Analyze your resume</h1>

        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            <p className="font-medium text-slate-800">{uploaded.filename}</p>
            <p className="text-sm text-slate-500">
              {uploaded.page_count} page(s), {uploaded.text_length} characters read
            </p>
          </div>
          {!analyzing && (
            <button
              onClick={handleReset}
              className="text-sm font-medium text-blue-600 underline hover:text-blue-800"
            >
              Change resume
            </button>
          )}
        </div>

        <JobDescriptionForm onSubmit={handleAnalyze} loading={analyzing} />

        {analyzing && <LoadingSpinner message="Analyzing your resume..." />}

        <ErrorMessage message={error} />
      </div>
    )
  }

  // ----- Before upload -----
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Upload Resume</h1>

      <FileDropzone
        onFileAccepted={handleFileAccepted}
        onFileRejected={handleFileRejected}
        disabled={uploading}
      />

      {file && !uploading && (
        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
          <div>
            <p className="font-medium text-slate-800">{file.name}</p>
            <p className="text-sm text-slate-500">{formatSize(file.size)}</p>
          </div>
          <button
            onClick={handleUpload}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      )}

      {uploading && <LoadingSpinner message="Uploading and reading your resume..." />}

      <ErrorMessage message={error} />
    </div>
  )
}

export default UploadPage;