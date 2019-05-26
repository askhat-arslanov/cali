import React, { useContext } from 'react'

const FirebaseContext = React.createContext(null)

const withFirebase = Wrapped => props => {
  const firebase = useContext(FirebaseContext)
  return <Wrapped {...props} firebase={firebase} />
}

export default FirebaseContext
export { withFirebase }
