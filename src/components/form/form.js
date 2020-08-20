import React from 'react'

import './form.scss'
import { LightSpinner } from '../spinner'

const Form = ({ btnTitle, children, disabled, error, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      {error && <p className="error-message">{error}</p>}
        <button className="form__btn" type="submit" disabled={disabled}>
          {loading ? <LightSpinner /> : <span>{btnTitle}</span>}
        </button>
    </form>
  )
}

export default Form
