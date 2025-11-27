import axios from 'axios'

// Read base URL from .env (VITE_API_URL), fallback to backend default
const raw = import.meta.env.VITE_API_URL || 'http://localhost:4545/api'

// Ensure final URL always ends with /api
// Example: if raw = http://localhost:2222 → becomes http://localhost:2222/api
const API_BASE = raw.endsWith('/api')
  ? raw
  : raw.replace(/\/$/, '') + '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
})

// Attach JWT token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
