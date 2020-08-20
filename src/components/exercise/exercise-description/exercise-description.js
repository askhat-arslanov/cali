import React from 'react'

import './exercise-description.scss'
import { LightSpinner } from '../../spinner'

const ExerciseDescription = ({ description, loading }) => {
  if (loading) return <LightSpinner />
  
  return (
    <div className="description">
      {description.length ? (
        <ul className="description__list">
          {description.map((item, idx) => (
            <li className="description__item" key={idx}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>Wow, such empty</p>
      )}
    </div>
  )
}

export default ExerciseDescription
