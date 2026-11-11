import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="py-10 text-center">
      <h1 className="text-4xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-600">This page does not exist.</p>
      <Link to="/" className="mt-4 inline-block font-medium text-blue-600 underline">
        Go to the home page
      </Link>
    </div>
  )
}

export default NotFoundPage;