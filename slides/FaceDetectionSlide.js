import React from 'react'
import FaceDetectionApplet from '../components/FaceDetectionApplet'
import { SlideLayout } from '../layouts/SlideLayout'
import MuiTheme from '../theme/MuiTheme'

const FaceDetectionSlide = () => {
  return (
    <MuiTheme> 
      <SlideLayout title="Examples" justifyContent='center'>
        <FaceDetectionApplet />
      </SlideLayout>
    </MuiTheme>
  )
}

export default FaceDetectionSlide
