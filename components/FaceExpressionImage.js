import React, { useEffect  } from 'react';
import * as faceapi from 'face-api.js';
import useDetections from '../hooks/useDetections';

function FaceExpressionImage({ src, drawDetections = true, drawLandmarks = false, drawFaceExpressions = false,  ...imageProps }) {
  const { detections, imageRef, canvasRef} = useDetections(src) 

  useEffect(() => {
    if (detections.length > 0) {
      const minConfidence = 0.05
      if (drawDetections) {
      faceapi.draw.drawDetections(canvasRef.current, detections)
      }

      if (drawFaceExpressions) {
      faceapi.draw.drawFaceExpressions(canvasRef.current, detections, minConfidence)
      }

      if (drawLandmarks) {
      faceapi.draw.drawFaceLandmarks(canvasRef.current, detections)
      }

    }
  }, [detections]);

  return (
    <div style={{position: 'relative'}}>
      {src && <img ref={imageRef} src={src} {...imageProps} />}
      <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0}} />
    </div>
  );
}

export default FaceExpressionImage;


