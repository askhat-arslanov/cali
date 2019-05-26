import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.scss'
import { withAuthUser } from '../session'
import SignOutButton from '../sign-out'

const Navbar = ({ authUser }) => {
  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <GeneralLinks />
        {authUser ? <AuthLinks /> : <NoneAuthLinks />}
      </ul>
    </nav>
  )
}

const GeneralLinks = () => {
  return (
    <>
      <li className="navbar__link">
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
    </>
  )
}

const AuthLinks = () => {
  return (
    <>
      <SignOutButton />
    </>
  )
}

const NoneAuthLinks = () => {
  return (
    <>
      <li className="navbar__link">
        <NavLink to="/signin">Login</NavLink>
      </li>
      <li className="navbar__link">
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  )
}

export default withAuthUser(Navbar)
