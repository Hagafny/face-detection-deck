import React from 'react'
import FaceDetectionApplet from '../components/FaceDetectionApplet'
import { SlideLayout } from '../layouts/SlideLayout'
import MuiTheme from '../theme/MuiTheme'

const FaceDetectionSlide = () => {
  return (
    <MuiTheme> 
      <SlideLayout title="Examples" justifyContent='center'>
        <div style={{ transform: 'scale(1.5)',marginTop: '50px' }}>
        <FaceDetectionApplet />
        </div>
      </SlideLayout>
    </MuiTheme>
  )
}

export default FaceDetectionSlide
