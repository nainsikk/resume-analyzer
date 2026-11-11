import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds: analysis can take a while
})

// API calls (one function per backend endpoint)

export async function checkHealth() {
  const response = await api.get('/api/health')
  return response.data
}

export async function uploadResume(file) {
  // Files are sent as multipart/form-data. The field must be named "file".
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/api/resume/upload', formData)
  return response.data
}

export async function analyzeResume(resumeId, jobDescription) {
  const response = await api.post('/api/analyze', {
    resume_id: resumeId,
    job_description: jobDescription,
  })
  return response.data
}

export async function getAnalysis(id) {
  const response = await api.get(`/api/analysis/${id}`)
  return response.data
}

export async function getHistory() {
  const response = await api.get('/api/history')
  return response.data
}

//Error helper 

// Turns any Axios error into one readable message for the user.
export function getErrorMessage(error) {
  // The server answered with an error status
  if (error.response) {
    const detail = error.response.data?.detail

    // Normal errors: {"detail": "File is too large..."}
    if (typeof detail === 'string') return detail

    // Validation errors (422) come as a list of problems
    if (Array.isArray(detail) && detail.length > 0) {
      return detail[0].msg || 'Invalid input.'
    }
    return 'Something went wrong. Please try again.'
  }

  // The request was sent but no answer came back
  if (error.request) {
    return 'Cannot reach the server. Check that the backend is running.'
  }

  return 'Unexpected error. Please try again.'
}