import React from 'react';
import FaceAPIImage from './FaceAPIImage';
import theme from '../theme/base'

const imageName = 'ron.png'

const detectionBoxOptions = {
  boxColor: theme.PRIMARY
}

function LoaderSlide({showDetections = true}) {
  return (
        <FaceAPIImage src={imageName} drawDetections={showDetections} drawFaceExpressions={showDetections} detectionBoxOptions={detectionBoxOptions} style={{width: '345px', height: '400px'} } />
        )
  }

export default LoaderSlide;
