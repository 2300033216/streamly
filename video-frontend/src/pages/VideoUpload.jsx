import React, { useState, useContext } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function VideoUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const nav = useNavigate()
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="card">
        <h2>Upload video</h2>
        <p className="muted">You need to log in to upload videos.</p>
      </div>
    )
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!file) return alert('Pick a file')

    const form = new FormData()
    form.append('file', file)
    form.append('title', title)
    form.append('description', desc)

    try {
      await api.post('/videos/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Uploaded')
      nav('/')
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    }
  }

  return (
    <div className="card">
      <h2>Upload video</h2>

      <form onSubmit={submit} className="form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Description"
        />

        <input
          type="file"
          accept="video/*"
          onChange={e => setFile(e.target.files[0])}
        />

        <button className="btn" type="submit">Upload</button>
      </form>
    </div>
  )
}
