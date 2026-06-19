import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import PlaceDetail from './components/PlaceDetail'

const App = () => {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#0F0F12", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App