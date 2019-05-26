import React, { useEffect, useState } from 'react'

import './exercise.scss'
import ErrorBoundary from '../error-boundary'
import ExerciseDescription from './exercise-description'
import ExerciseVideo from './exercise-video'
import { withFirebase } from '../firebase'

const Exercise = ({ children, firebase, name, routine }) => {
  const [description, setDescription] = useState([])
  const [videoLink, setVideoLink] = useState('')

  const [showDescription, setShowDescription] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showDescription && !description.length) {
      setLoading(true)
      firebase[`${routine}Info`](name).then(doc => {
        if (doc.data()) setDescription(doc.data().text)
        setLoading(false)
      })
    }
  }, [showDescription])

  useEffect(() => {
    if (showVideo && !videoLink) {
      setLoading(true)
      firebase[`${routine}Info`](name).then(doc => {
        if (doc.data()) setVideoLink(doc.data().videoLink)
        setLoading(false)
      })
    }
  }, [showVideo])

  return (
    <ErrorBoundary>
      <div className={`exercise ${routine}-exercise`}>
        <div className="exercise__header">
          <h2>{name}</h2>
          <span className="exercise__info-toggles">
            <i
              className="icon fas fa-book"
              onClick={() => setShowDescription(!showDescription)}
            />
            <i
              className="icon fas fa-video"
              onClick={() => setShowVideo(!showVideo)}
            />
          </span>
        </div>

        <div className="exercise__content">{children()}</div>

        <div className="exercise__info">
          {showDescription && (
            <ExerciseDescription description={description} loading={loading} />
          )}
          {showVideo && <ExerciseVideo videoLink={videoLink} />}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default withFirebase(Exercise)
