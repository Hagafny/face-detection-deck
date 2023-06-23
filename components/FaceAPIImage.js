import React, { useCallback } from 'react';
import * as faceapi from 'face-api.js';
import BaseFaceAPIImage from './BaseFaceAPIImage';

function FaceAPIImage(faceDetectionProps) {
  const drawDetections = useCallback((detections, imageCanvas) => {    
    const minConfidence = 0.05
    if (faceDetectionProps.drawDetections) {
      detections.forEach((detection) => {
        const drawBox = new faceapi.draw.DrawBox(detection.detection.box, faceDetectionProps.detectionBoxOptions);
        drawBox.draw(imageCanvas);
    }) 
  }

    if (faceDetectionProps.drawFaceExpressions) {
      faceapi.draw.drawFaceExpressions(imageCanvas, detections, minConfidence)
    }

    if (faceDetectionProps.drawLandmarks) {
      faceapi.draw.drawFaceLandmarks(imageCanvas, detections)
    }
}, [])

  return (
    <BaseFaceAPIImage drawBoxes={drawDetections} {...faceDetectionProps} />
  );
}

export default FaceAPIImage;


