import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {StoreContextProvider} from "./store/store-context";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
  </React.StrictMode>,
)
