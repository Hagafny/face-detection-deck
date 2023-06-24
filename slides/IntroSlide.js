import React from 'react'
import { SideBySide } from '../layouts/SideBySide'
import FaceAPIImage from '../components/FaceAPIImage.js'
import { ImageDeck } from '../images/ImageDeck.js'
import theme from '../theme/base'
import * as faceapi from'face-api.js'

const IMAGE_NAME = 'ron.png'

const detectionBoxOptions = {
  boxColor: theme.PRIMARY
}

const faceDetector = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold: 0.1 });

const IntroSlide = ({ showDetections }) => (
    <div style={{ width: '1024px', margin: '0 auto', height: '100%'}}>
    <h2 style={{ textAlign: 'center'}}>How we used Face Detection to create a delightful User Experience</h2>

<SideBySide style={{ marginTop: '80px'}}>
  <div style={{ display: 'flex', justifyContent: 'center'}}>
    <FaceAPIImage src={IMAGE_NAME} faceDetector={faceDetector} drawDetections={showDetections} drawExpressions={showDetections} detectionBoxOptions={detectionBoxOptions} style={{width: '517px', height: '600px'} } />
    </div>
  <div>
    <div style={{textAlign: 'center', fontSize: '46px'}}>Ron Hagafny</div>
    <p></p>
    <ImageDeck src='mixtiles.svg' height='75px' />
  </div>
  </SideBySide>
  </div>
)

export default IntroSlide