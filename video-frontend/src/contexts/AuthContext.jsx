// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import api from '../api/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // On first load, restore auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    if (token && username) {
      setUser({ username, role })
    }
  }, [])

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })

    const { token, username: uName, role } = res.data

    localStorage.setItem('jwt', token)
    localStorage.setItem('username', uName)
    localStorage.setItem('role', role)

    setUser({ username: uName, role })
  }

  // signup still sends username + password + email
  const signup = async (username, password, email) => {
    await api.post('/auth/signup', { username, password, email })
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    setUser(null)
  }

  const isAdmin = user?.role === 'ROLE_ADMIN'

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
