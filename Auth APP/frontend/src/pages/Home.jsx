import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../api/authAPI'

const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = async () => {
    try {
      await authLogout()
      localStorage.removeItem('user')
      navigate('/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 60px)',
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
        }}>
          <h2 style={{ color: '#333', marginBottom: '12px', fontSize: '24px' }}>
            Welcome, {user.username}!
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {user.email}
          </p>
          <p style={{ color: '000', fontSize: '14px', marginTop: '20px' }}>
            You are logged in successfully.
          </p>
          <button
          onClick={handleLogout}
          style={{
            padding: '8px 20px',
            backgroundColor: '#a305fb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  )
}

export default Home
