import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-slate-800 shadow-md shadow-slate-900/20 sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto px-6 py-4'>

            {/* Logo */}
            <Link to="/" className='select-none'>
              <span className='text-xl font-bold tracking-tight text-white'>
                Realm<span className='text-amber-400'>Estate</span>
              </span>
            </Link>

            {/* Search */}
            <div className='hidden sm:block relative'>
              <input
                type='search'
                placeholder='Search properties...'
                className='bg-slate-700/60 text-slate-200 placeholder-slate-400 rounded-full px-5 py-2 w-64 text-sm border border-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200'
              />
            </div>

            {/* Nav Links */}
            <nav className='flex items-center gap-6'>
              <Link
                to="/home"
                className='text-slate-300 text-sm font-medium hover:text-white transition-colors duration-200'
              >
                Home
              </Link>

              {currentUser ? (
                <Link to="/profile">
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    className='h-8 w-8 rounded-full object-cover border-2 border-slate-600 hover:border-amber-400 transition-all duration-200'
                  />
                </Link>
              ) : (
                <Link
                  to="/sign-in"
                  className='text-sm font-medium bg-amber-400 text-slate-900 px-4 py-2 rounded-full hover:bg-amber-300 transition-colors duration-200'
                >
                  Sign in
                </Link>
              )}
            </nav>

        </div>
    </header>
  )
}
