import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './Redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   
    <Provider store={store} >
        <PersistGate persistor={persistor} >
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
   
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
