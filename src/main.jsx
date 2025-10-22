 // src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserListsProvider } from './context/UserListsContext' // Context'i import et

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserListsProvider> {/* Uygulamayı sarmala */}
        <App />
      </UserListsProvider>
    </BrowserRouter>
  </StrictMode>,
)