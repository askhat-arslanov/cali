import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './app.scss'
import GearIcon from './img/gear.svg'
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
      <img className="app__decorate-icon app__decorate-icon--left" src={GearIcon} alt="Gear" />
      <img className="app__decorate-icon app__decorate-icon--right" src={GearIcon} alt="Gear" />

      <Navbar />

      <ErrorBoundary>
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
      </ErrorBoundary>
    </div>
  )
}

export default withAuthentication(App)
