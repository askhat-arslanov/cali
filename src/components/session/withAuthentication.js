import React, { useEffect, useState } from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../firebase'

const withAuthentication = Wrapped => {
  const WithAuthentication = props => {
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem('authUser'))
    )
    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          setAuthUser(authUser)
        } else {
          localStorage.removeItem('authUser')
          setAuthUser(null)
        }
      })
      return () => listener()
    })
    return (
      <AuthUserContext.Provider value={authUser}>
        <Wrapped />
      </AuthUserContext.Provider>
    )
  }
  return withFirebase(WithAuthentication)
}

export default withAuthentication
