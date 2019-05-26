import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../firebase'

const withAuthorization = condition => Wrapped => {
  const WithAuthorization = props => {
    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) props.history.push('/singin')
      })
      return () => listener()
    })
    return <Wrapped {...props} />
  }
  return compose(
    withFirebase,
    withRouter
  )(WithAuthorization)
}

export default withAuthorization
