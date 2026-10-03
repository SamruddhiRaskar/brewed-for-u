// StrictMode is a development tool which helps find possible problems in React
import { StrictMode } from 'react'

// createRoot is the container where React puts the application
import { createRoot } from 'react-dom/client'

// It loads CSS file
import './App.css'

// It loads App.jsx file
import App from './App.jsx'

// Google authentication provider
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="608112493135-6d8v77975ing6s5dh9iq4aau7ki0o691.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)

// Render displays the React component inside the root
// Find #root, put App inside it, then React renders the app