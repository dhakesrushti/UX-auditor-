import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const IS_DEV = import.meta.env.DEV

// For development, use a fallback or skip Clerk if key is invalid
const renderApp = () => {
  if (PUBLISHABLE_KEY && (PUBLISHABLE_KEY.startsWith('pk_live_') || PUBLISHABLE_KEY.startsWith('pk_test_') && PUBLISHABLE_KEY.length > 20)) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    )
  } else if (IS_DEV) {
    // In development mode, render app without Clerk if key is missing or invalid
    console.warn('Clerk Publishable Key is missing or invalid. Running in development mode without authentication.')
    return <App />
  } else {
    throw new Error('Missing or invalid Publishable Key. Get it from https://dashboard.clerk.com/last-active?path=api-keys')
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {renderApp()}
  </StrictMode>,
)
