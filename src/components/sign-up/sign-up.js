import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../firebase'
import Form from '../form'
import { SignInLink } from '../sign-in'

const SignUp = () => (
  <div className="form">
    <h2>Sign Up</h2>
    <SignUpForm />
    <SignInLink />
  </div>
)

const SignUpFormBase = ({ firebase, history }) => {
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isInvalid = !login || !email || !passwordOne || passwordOne !== passwordTwo

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    firebase
      .doSignUp(email, passwordOne)
      .then(authUser => {
        return firebase.user(authUser.user.uid).set({
          email,
          login
        })
      })
      .then(() => {
        history.push('/')
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }

  return (
    <Form
      btnTitle="create"
      disabled={isInvalid}
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={login}
        placeholder="Login"
        onChange={e => setLogin(e.target.value)}
      />

      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={passwordOne}
        placeholder="Password"
        onChange={e => setPasswordOne(e.target.value)}
      />

      <input
        type="password"
        value={passwordTwo}
        placeholder="Confirm password"
        onChange={e => setPasswordTwo(e.target.value)}
      />
    </Form>
  )
}

const SignUpForm = compose(withFirebase, withRouter)(SignUpFormBase)

const SignUpLink = () => (
  <p className="auth-redirect">
    Don't have an account?{' '}
    <Link to="/signup" className="auth-redirect__link">
      SignUp
    </Link>
  </p>
)

export default SignUp
export { SignUpLink }
