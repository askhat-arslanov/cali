import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../firebase'
import Form from '../form'
import { SignUpLink } from '../sign-up'

const SignIn = () => (
  <div className="form">
    <h2>Sign In</h2>
    <SignInForm />
    <SignUpLink />
  </div>
)

const SignInFormBase = ({ firebase, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isInvalid = !email || !password

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    firebase
      .doSignIn(email, password)
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
      btnTitle="login"
      disabled={isInvalid}
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <div>
            <input
              type="text"
              name="login"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="text"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </>
      )}
    </Form>
  )
}

const SignInForm = compose(
  withFirebase,
  withRouter
)(SignInFormBase)

const SignInLink = () => (
  <p>
    Already have an account?{' '}
    <Link to="/signin" className="auth-link">
      Login
    </Link>
  </p>
)

export default SignIn
export { SignInLink }
