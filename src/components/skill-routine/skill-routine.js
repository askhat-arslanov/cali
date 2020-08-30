import React, { useEffect, useState } from 'react'

import './skill-routine.scss'
import Exercise from '../exercise'
import { withFirebase } from '../firebase'
import { BackgroundSpinner } from '../spinner'

const SkillRoutine = ({ firebase }) => {
  const [routine, setRoutine] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.skill().then(doc => {
      setRoutine(doc.data().routine)
      setLoading(false)
    })
  }, [])

  if (loading) return <BackgroundSpinner />

  return (
    <div className="main">
      {routine.map(exercise => {
        const { name, time } = exercise
        return (
          <Exercise key={name} name={name} routine={'skill'}>
            <p className="secondary">Reps/time: {time}</p>
          </Exercise>
        )
      })}
    </div>
  )
}

export default withFirebase(SkillRoutine)
