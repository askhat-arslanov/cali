import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import moment from 'moment'

import './strength-routine.scss'
import Exercise from '../exercise'
import ExerciseMonitor from '../exercise/exercise-monitor'
import { withFirebase } from '../firebase'
import { withAuthUser } from '../session'
import { BackgroundSpinner } from '../spinner'

const StengthRoutine = ({ authUser, firebase }) => {
  const [routine, setRoutine] = useState([])
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState(false)

  const saveRoutine = () => {
    // Create unique key for document
    const key = `${moment(Date.now()).format('LL')}_${authUser.uid}`
    firebase.db
      .collection('userRoutines')
      .doc(key)
      .set({ routine, userId: authUser.uid, timestamp: Date.now() })
      .then(() => showSavedNotify())
      .catch(error => console.log(error.message))
  }

  // useDebounce - custom hook, which delaid function execution
  const debouncedSaveRoutine = useDebounce(routine, 1000)

  // Routine will be saved after update debouncedSaveRoutine
  useEffect(() => {
    if (authUser && routine.length) saveRoutine()
  }, [debouncedSaveRoutine])

  useEffect(() => {
    if (authUser) {
      setWarning(false)
      setLoading(true)
      firebase
        .lastStrengthRoutine(authUser.uid)
        .then(qs => {
          if (qs.docs[0]) {
            setRoutine(qs.docs[0].data().routine)
          } else {
            // If user doesn't have saved routine yet fetch initial values
            firebase.strength().then(doc => {
              setRoutine(doc.data().routine)
            })
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      // If user is not authenticated show warning about it
      // and fetch strength routine with initial values
      setWarning(true)
      firebase.strength().then(doc => {
        setRoutine(doc.data().routine)
      })
    }
  }, [authUser])

  const handleChange = (name, kind, direction) => {
    const index = routine.findIndex(i => i.name === name)
    const exercise = { ...routine[index] }
    exercise[kind] =
      direction === 'up' ? exercise[kind] + 1 : exercise[kind] - 1
    setRoutine([
      ...routine.slice(0, index),
      exercise,
      ...routine.slice(index + 1)
    ])
  }

  if (loading) return <BackgroundSpinner />

  return (
    <div className="main">
      <p id="notify">Saved</p>
      {warning && (
        <p className="error-message">
          You must <Link to="/signin">login</Link> to save progress!
        </p>
      )}
      {routine.map(exercise => {
        const { name, reps, sets, weight } = exercise
        return (
          <Exercise key={name} name={name} routine={'strength'}>
            {() => (
              <>
                <ExerciseMonitor
                  name={'reps'}
                  value={reps}
                  onUp={() => handleChange(name, 'reps', 'up')}
                  onDown={() => {
                    if (reps > 1) handleChange(name, 'reps')
                  }}
                />
                <ExerciseMonitor
                  name={'sets'}
                  value={sets}
                  onUp={() => handleChange(name, 'sets', 'up')}
                  onDown={() => {
                    if (sets > 1) handleChange(name, 'sets')
                  }}
                />
                <ExerciseMonitor
                  name={'weight'}
                  value={weight}
                  onUp={() => handleChange(name, 'weight', 'up')}
                  onDown={() => {
                    if (weight > 0) handleChange(name, 'weight')
                  }}
                />
              </>
            )}
          </Exercise>
        )
      })}
    </div>
  )
}

export default compose(
  withAuthUser,
  withFirebase
)(StengthRoutine)

// Hook for debounce function, like _.debounce in lodash
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value])
  return debouncedValue
}

// Informes user about saving routine
function showSavedNotify() {
  const notify = document.getElementById('notify')
  notify.className = 'show'
  setTimeout(function() {
    notify.className = notify.className.replace('show', '')
  }, 2000)
}
