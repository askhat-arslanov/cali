import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'
import App from './components/app'
import Firebase, { FirebaseContext } from './components/firebase'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
