import React from 'react'
import { Link } from 'react-router-dom'

import { withFirebase } from '../firebase'

const SignOutButton = ({ firebase }) => {
  const signOutHandler = () => {
    firebase.doSignOut()
  }
  return (
    <li className="navbar__link" onClick={signOutHandler}>
      <Link to="/">SignOut</Link>
    </li>
  )
}

export default withFirebase(SignOutButton)
