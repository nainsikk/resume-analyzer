import { Link } from 'react-router-dom'

const steps = [
  { title: '1. Upload', text: 'Upload your resume as a PDF (up to 5 MB).' },
  { title: '2. Add a job', text: 'Paste the job description you are applying for.' },
  { title: '3. Get results', text: 'See your match score, missing skills and suggestions.' },
]

function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">AI Resume Analyzer</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Compare your resume with a job description and find out which skills match,
          which are missing, and how to improve.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/upload"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Analyze my resume
          </Link>
          <Link
            to="/history"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            View history
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="rounded-xl bg-white p-6 shadow">
            <h2 className="font-semibold text-slate-800">{step.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{step.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default HomePage;