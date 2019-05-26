import React from 'react'

import './exercise-monitor.scss'

const ExerciseMonitor = ({ name, value, onUp, onDown }) => {
  return (
    <div className="monitor">
      <span className="monitor__name">{name}</span>
      <div className="monitor__changers">
        <span className="monitor__value">{value}</span>
        <div className="monitor__btns">
          <button className="monitor__btn" onClick={onUp}>
            &#9650;
          </button>
          <button className="monitor__btn" onClick={onDown}>
            &#9660;
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExerciseMonitor
