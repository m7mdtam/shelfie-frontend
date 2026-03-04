import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>Bookshelf Frontend - Coming Soon</div>
    </ThemeProvider>
  </React.StrictMode>
)
