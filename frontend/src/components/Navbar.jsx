import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/history', label: 'History' },
]

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">Resume Analyzer</span>

        <div className="flex gap-4 sm:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar;