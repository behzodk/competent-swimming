import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

;(function() {
  const originalWarn = console.warn
  console.warn = (...args) => {
    const msg = args[0]
    // suppress only the WebSocket connection warnings
    if (typeof msg === 'string' && msg.includes('WebSocket connection to')) {
      return
    }
    originalWarn.apply(console, args)
  }
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
