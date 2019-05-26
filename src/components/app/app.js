import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './app.scss'
import ErrorBoundary from '../error-boundary'
import Navbar from '../navbar'
import StengthRoutine from '../strength-routine'
import { withAuthentication } from '../session'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import SkillRoutine from '../skill-routine'
import StartPage from '../start-page'
import WarmUpRoutine from '../warm-up-routine'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <ErrorBoundary>
        <div className="app__grid">
          <div className="app__content">
            <Switch>
              <Route exact path="/" component={StartPage} />
              <Route path="/strength" component={StengthRoutine} />
              <Route path="/skill" component={SkillRoutine} />
              <Route path="/warm-up" component={WarmUpRoutine} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default withAuthentication(App)
