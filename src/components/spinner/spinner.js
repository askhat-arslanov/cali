import React from 'react'

import './spinner.scss'
import lightSpinner from './img/ripple-light.svg'

const LightSpinner = () => (
  <img className="spinner" src={lightSpinner} alt="Loading" />
)

const BackgroundSpinner = () => (
  <div className="background-spinner">
    <img className="spinner" src={lightSpinner} alt="Loading" />
  </div>
)

export { BackgroundSpinner, LightSpinner }
