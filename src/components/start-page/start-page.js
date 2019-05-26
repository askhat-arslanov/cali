import React from 'react'
import { Link } from 'react-router-dom'

import './start-page.scss'

function StartPage() {
  return (
    <div className="start-page">
      <Link className="option warm-up" to="/warm-up">
        <span className="option__text">warm up</span>
      </Link>
      <Link className="option strength-day" to="/strength">
        <span className="option__text">strength day</span>
      </Link>
      <Link className="option skill-day" to="/skill">
        <span className="option__text">skill day</span>
      </Link>
    </div>
  )
}

export default StartPage
