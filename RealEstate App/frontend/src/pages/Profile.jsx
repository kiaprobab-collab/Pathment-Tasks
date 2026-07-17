import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserSuccess, deleteUserSuccess, signOutSuccess } from '../redux/user/userSlice';
import { updateUserAPI, deleteUserAPI } from '../../api/userAPI';
import { authLogout } from '../../api/authAPI';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUpdateSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUpdateSuccess(false);

    try {
      // Only send fields that have values (skip empty password)
      const payload = { username: formData.username, email: formData.email };
      if (formData.password) payload.password = formData.password;

      const data = await updateUserAPI(currentUser._id, payload);
      dispatch(updateUserSuccess(data.user));
      setUpdateSuccess(true);
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

    try {
      await deleteUserAPI(currentUser._id);
      dispatch(deleteUserSuccess());
      navigate('/sign-in');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
    }
  };

  const handleSignOut = async () => {
    try {
      await authLogout();
      dispatch(signOutSuccess());
      navigate('/sign-in');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign out');
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '48px',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '36px 32px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)',
        }}
      >
        {/* Title */}
        <h1
          style={{
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '28px',
          }}
        >
          Profile
        </h1>

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img
            src={currentUser?.avatar || 'https://ui-avatars.com/api/?name=' + (currentUser?.username || 'U') + '&background=f59e0b&color=fff&bold=true'}
            alt="avatar"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #f59e0b',
            }}
          />
        </div>

        {/* Status Messages */}
        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
              textAlign: 'center',
              border: '1px solid #fecaca',
            }}
          >
            {error}
          </div>
        )}
        {updateSuccess && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              color: '#16a34a',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px',
              textAlign: 'center',
              border: '1px solid #bbf7d0',
            }}
          >
            Profile updated successfully!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1e293b',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        {/* Bottom Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
          }}
        >
          <button
            onClick={handleDeleteUser}
            style={{
              background: 'none',
              border: 'none',
              color: '#dc2626',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            style={{
              background: 'none',
              border: 'none',
              color: '#dc2626',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Shared styles
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#475569',
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#1e293b',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#f8fafc',
  transition: 'border-color 0.2s',
};