import { useParams } from 'react-router-dom'

function ResultsPage() {
  const { id } = useParams()

  return (
    <h1 className="text-2xl font-bold text-slate-800">
      Results for analysis #{id}
    </h1>
  )
}

export default ResultsPage