import React from 'react'
import FaceDetectionApplet from '../components/FaceDetectionApplet'
import { SlideLayout } from '../layouts/SlideLayout'

const FaceDetectionSlide = () => {
  return (
    <SlideLayout title="face-api.js">
        <FaceDetectionApplet />
    </SlideLayout>
  )
}

export default FaceDetectionSlide
