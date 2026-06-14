import './App.css'
import  Dashboard  from './screens/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Dashboard />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
