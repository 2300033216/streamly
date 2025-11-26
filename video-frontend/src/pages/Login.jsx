import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import bgVideo from '../assets/auth-bg.mp4'
import './auth.css'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      nav('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="auth-page">
      <video
        className="auth-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="auth-overlay" />

      {/* keep your existing card styles + new auth-card */}
      <div className="auth-card card">
        <h2>Login</h2>

        <form onSubmit={submit} className="form">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  )
}
