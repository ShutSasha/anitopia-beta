import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './app/styles/main.scss'
import Store from './app/store/store.ts'
import { ErrorBoundary } from './shared/index.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

//const clientId = process.env.REACT_APP_CLIENT_ID || 'defaultClientId'

interface State {
   store: Store
}

const store = new Store()
export const Context = createContext<State>({
   store,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <GoogleOAuthProvider clientId='264314347191-trnhhm4le2gs6igghf0vjuhigfek7e9t.apps.googleusercontent.com'>
         <Context.Provider value={{ store }}>
            <ErrorBoundary>
               <App />
            </ErrorBoundary>
         </Context.Provider>
      </GoogleOAuthProvider>
   </React.StrictMode>,
)
