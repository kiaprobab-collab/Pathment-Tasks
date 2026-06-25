import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CardContextProvider } from './cardContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CardContextProvider>
    <App />
  </CardContextProvider>

)
