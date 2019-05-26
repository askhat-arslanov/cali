import React from 'react'

import './exercise-video.scss'

const ExerciseVideo = ({ videoLink }) => (
  <div className="video">
    {videoLink ? (
      <iframe
        src={videoLink}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    ) : (
      <p>Wow, such empty</p>
    )}
  </div>
)

export default ExerciseVideo
