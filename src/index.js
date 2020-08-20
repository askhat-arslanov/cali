import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import './index.scss'
import App from './components/app'
import Firebase, { FirebaseContext } from './components/firebase'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <HashRouter>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </HashRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
