import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './warm-up-routine.scss'
import Exercise from '../exercise'
import { withFirebase } from '../firebase'
import { BackgroundSpinner } from '../spinner'

const WarmUpRoutine = ({ firebase }) => {
  const [routine, setRoutine] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.warmUp().then(doc => {
      setRoutine(doc.data().routine)
      setLoading(false)
    })
  }, [])

  if (loading) return <BackgroundSpinner />

  return (
    <div className="main">
      {routine.map(exercise => {
        const { name, reps } = exercise
        return (
          <Exercise key={name} name={name} routine={'warm-up'}>
            {() => <p className="secondary">Reps/time: {reps}</p>}
          </Exercise>
        )
      })}
      <Link className="strength-link" to="/strength">
        Go to Strength Routine
      </Link>
      <Link className="skill-link" to="/skill">
        Go to Skill Routine
      </Link>
    </div>
  )
}

export default withFirebase(WarmUpRoutine)
