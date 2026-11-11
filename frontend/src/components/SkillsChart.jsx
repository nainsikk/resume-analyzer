import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const MATCHED_COLOR = '#16a34a'
const MISSING_COLOR = '#dc2626'

function SkillsChart({ matchedCount, missingCount }) {
  const total = matchedCount + missingCount

  if (total === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="font-semibold text-slate-800">Skill coverage</h2>
        <p className="mt-3 text-sm text-slate-500">No skills data to chart.</p>
      </div>
    )
  }

  const coverage = Math.round((matchedCount / total) * 100)
  const data = [
    { name: 'Matched', value: matchedCount },
    { name: 'Missing', value: missingCount },
  ]

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="font-semibold text-slate-800">Skill coverage</h2>

      <div className="relative mx-auto mt-2 h-48 w-full max-w-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={matchedCount > 0 && missingCount > 0 ? 3 : 0}
              stroke="none"
            >
              <Cell fill={MATCHED_COLOR} />
              <Cell fill={MISSING_COLOR} />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Percentage in the middle of the donut */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800">{coverage}%</span>
          <span className="text-xs text-slate-500">of required skills</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex justify-center gap-6 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: MATCHED_COLOR }} />
          Matched ({matchedCount})
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: MISSING_COLOR }} />
          Missing ({missingCount})
        </span>
      </div>
    </div>
  )
}

export default SkillsChart;