import React, { useCallback } from 'react';
import * as faceapi from 'face-api.js';
import BaseFaceAPIImage from './BaseFaceAPIImage';

function FaceAPIImage({ faceDetector, detectionBoxOptions, drawDetections, drawLandmarks, drawExpressions, ...imageProps }) {
  const drawBoxes = useCallback((detections, canvas) => {    
    if (drawDetections) {
      detections.forEach((detection) => {
        const drawBox = new faceapi.draw.DrawBox(detection.detection.box, detectionBoxOptions);
        drawBox.draw(canvas);
    }) 
  }

    if (drawExpressions) {
      faceapi.draw.drawFaceExpressions(canvas, detections, 0.05)
    }

    if (drawLandmarks) {
      faceapi.draw.drawFaceLandmarks(canvas, detections)
    }
}, [detectionBoxOptions, drawDetections, drawExpressions, drawLandmarks])

  return (
    <BaseFaceAPIImage drawBoxes={drawBoxes} faceDetector={faceDetector} {...imageProps} />
  );
}

export default FaceAPIImage;


