import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

function gaugeColor(value) {
  if (value >= 70) return '#16a34a' // green
  if (value >= 40) return '#f59e0b' // amber
  return '#dc2626' // red
}

function ScoreGauge({ value, label, suffix = '' }) {
  // Keep the value between 0 and 100 so the chart can never break
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0))

  const data = [
    { name: 'score', value: safeValue },
    { name: 'rest', value: 100 - safeValue },
  ]

  return (
    <div className="rounded-xl bg-white p-6 shadow text-center">
      <p className="text-sm text-slate-500">{label}</p>

      <div className="relative mx-auto mt-2 h-32 w-full max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy={118}
              innerRadius={78}
              outerRadius={108}
              stroke="none"
            >
              <Cell fill={gaugeColor(safeValue)} />
              <Cell fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <p className="absolute inset-x-0 bottom-1 text-3xl font-bold text-slate-800">
          {safeValue.toFixed(safeValue % 1 === 0 ? 0 : 1)}
          <span className="text-lg text-slate-400">{suffix}</span>
        </p>
      </div>
    </div>
  )
}

export default ScoreGauge;