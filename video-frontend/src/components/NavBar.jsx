import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function NavBar() {
  const { user, logout, isAdmin } = useContext(AuthContext)
  const nav = useNavigate()

  const toggleDark = () => {
    document.body.classList.toggle('dark')
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="logo" aria-hidden="true" />
          Streamly
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/">Videos</Link>

        {user ? (
          <>
            <Link to="/upload">Upload</Link>

            {/* small role badge */}
            {isAdmin && (
              <span className="badge role-badge">
                Admin
              </span>
            )}

            <button
              onClick={() => { logout(); nav('/'); }}
              className="btn-link"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}

        <button
          className="btn-link"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          🌗
        </button>
      </div>
    </nav>
  )
}
