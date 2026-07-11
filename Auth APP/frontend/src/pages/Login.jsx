import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authLogin } from '../api/authAPI'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await authLogin(formData)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: '#333',
          fontSize: '24px',
        }}>
          Login
        </h2>

        {error && (
          <p style={{
            color: '#e74c3c',
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              color: '#555',
              fontWeight: '600',
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              color: '#555',
              fontWeight: '600',
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
            }}
          >
            Login
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: '#666',
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#333', fontWeight: '600' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
