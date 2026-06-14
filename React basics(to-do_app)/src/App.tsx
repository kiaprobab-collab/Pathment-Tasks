import { useState } from 'react'

import './App.css'
import { Auth } from './screens/Auth'
import Board from './screens/Board'
import Dashboard from './screens/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/auth" element={<Auth />}/>
        <Route path = "/dashboard" element={<Dashboard />}/>
        <Route path = "/board/:boardId" element={<Board />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
