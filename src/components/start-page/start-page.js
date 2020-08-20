import React from 'react'
import { Link } from 'react-router-dom'

import './start-page.scss'
import SkillBack from './img/skill.png'
import StrengthBack from './img/strength.png'
import WarmupBack from './img/warmup.png'

function StartPage() {
  return (
    <div className="start-page">
      <Link className="option warm-up" to="/warm-up">
        <img className="option__back" src={WarmupBack} alt="Back" />
        <span className="option__text">warm up</span>
      </Link>
      <Link className="option strength-day" to="/strength">
        <img className="option__back" src={StrengthBack} alt="Back" />
        <span className="option__text">strength day</span>
      </Link>
      <Link className="option skill-day" to="/skill">
        <img className="option__back" src={SkillBack} alt="Back" />
        <span className="option__text">skill day</span>
      </Link>
    </div>
  )
}

export default StartPage
