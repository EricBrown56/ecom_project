import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* this allows us to use the BrowserRouter component from react-router-dom inside of App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)