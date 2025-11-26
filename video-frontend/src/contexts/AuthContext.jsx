// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import api from '../api/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      // Simple check: if token exists, mark as logged in
      setUser({ username: 'you' })
    }
  }, [])

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })
    localStorage.setItem('jwt', res.data.token)
    setUser({ username })
  }

  // updated: now accepts email too
  const signup = async (username, password, email) => {
    await api.post('/auth/signup', { username, password, email })
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
