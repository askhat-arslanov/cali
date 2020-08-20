import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.scss'
import { withAuthUser } from '../session'
import SignOutButton from '../sign-out'

const Navbar = ({ authUser }) => {
  const createAuthLinks = () => <SignOutButton />

  const createNonAuthLinks = () => (
    <>
      <NavLink className="navbar__link" to="/signin">
        Login
      </NavLink>
      <NavLink className="navbar__link" to="/signup">
        Sign Up
      </NavLink>
    </>
  )

  const createCommonLinks = () => (
    <NavLink className="navbar__link" exact to="/">
      Home
    </NavLink>
  )

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        {createCommonLinks()}
        {authUser ? createAuthLinks() : createNonAuthLinks()}
      </ul>
    </nav>
  )
}

export default withAuthUser(Navbar)
