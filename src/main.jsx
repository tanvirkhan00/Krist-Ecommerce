import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import firebaseConfig from './FireBase/FireBase.jsx'
import {ContextApi} from './Components/ContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi>
      <App />
    </ContextApi>
  </StrictMode>,
)
