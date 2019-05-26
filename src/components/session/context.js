import React, { useContext } from 'react'

const AuthUserContext = React.createContext(null)

const withAuthUser = Wrapped => props => {
  const authUser = useContext(AuthUserContext)
  return <Wrapped {...props} authUser={authUser} />
}

export default AuthUserContext
export { withAuthUser }
