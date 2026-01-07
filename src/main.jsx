import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './firebase.config'; // This initializes Firebaseimport
import { Provider } from 'react-redux'
import store from './Store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ContextApi>
        <App />
      </ContextApi>
    </Provider>
  </StrictMode>,
)
