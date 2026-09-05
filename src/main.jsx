import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { CvModalProvider } from './context/CvModalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CvModalProvider>
        <App />
      </CvModalProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
