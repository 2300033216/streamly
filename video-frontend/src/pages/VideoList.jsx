import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import VideoPlayer from './VideoPlayer'
import { AuthContext } from '../contexts/AuthContext'

export default function VideoList() {
  const [videos, setVideos] = useState([])
  const { user, isAdmin } = useContext(AuthContext)
  const nav = useNavigate()

  useEffect(() => {
    api.get('/videos')
      .then(r => setVideos(r.data))
      .catch(() => {})
  }, [])

  const canEdit = (v) => {
    if (!user) return false
    if (isAdmin) return true
    // backend sends uploader object with username
    return v.uploader && v.uploader.username === user.username
  }

  const handleEdit = (id) => {
    nav(`/edit/${id}`)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video?')) return
    try {
      await api.delete(`/videos/${id}`)
      setVideos(prev => prev.filter(v => v.id !== id))
    } catch (err) {
      console.error(err)
      alert('Delete failed (only admin can delete)')
    }
  }

  return (
    <div>
      <h2>All Videos</h2>

      <div className="grid">
        {videos.map(v => (
          <div className="card" key={v.id}>
            <h3>{v.title}</h3>
            <p className="muted">{v.description}</p>

            <VideoPlayer filename={v.filename} />

            {(canEdit(v) || isAdmin) && (
              <div className="card-actions">
                {canEdit(v) && (
                  <button
                    className="btn-link"
                    onClick={() => handleEdit(v.id)}
                  >
                    Edit
                  </button>
                )}

                {isAdmin && (
                  <button
                    className="btn-link danger"
                    onClick={() => handleDelete(v.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
