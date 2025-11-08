import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from './context/AppContextProvider.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { clerkKey } from './config/config.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <ClerkProvider publishableKey={clerkKey}>
        <App />
      </ClerkProvider>
    </AppContextProvider>
  </StrictMode>
);
