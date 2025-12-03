import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { registerServiceWorker } from './serviceWorkerRegistration'

import './index.css'
import App from './App.jsx'

// Global Error Logging
window.onerror = (msg, url, lineNo, columnNo, error) => {
  console.error('Global Error:', msg, 'URL:', url, 'Line:', lineNo, 'Column:', columnNo, 'Error object:', error);
  return false;
};

const queryClient = new QueryClient()

console.log('Main.jsx: Rendering root');

registerServiceWorker()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
