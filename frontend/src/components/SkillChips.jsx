const styles = {
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
}

function SkillChips({ title, skills, color = 'green', emptyText = 'None' }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="font-semibold text-slate-800">
        {title} <span className="text-slate-400 font-normal">({skills.length})</span>
      </h2>

      {skills.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">{emptyText}</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full px-3 py-1 text-sm font-medium ${styles[color]}`}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillChips;