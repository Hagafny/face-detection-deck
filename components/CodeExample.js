import React, { useEffect, useRef  } from 'react';
import useFaceApiModels from '../hooks/useFaceApiModels';
import * as faceapi from 'face-api.js'
import { getServerImage } from '../utils/helpers';

const exampleImage = getServerImage('example_code.jpg')

function CodeExample({ useDetections=false, useExpressions=false, useLandmarks=false }) {
  const modelsLoaded = useFaceApiModels()
  const imageRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {
    const detectFaces = async () => {
        if (modelsLoaded && imageRef.current) {
            const detections = await faceapi.detectAllFaces(
              imageRef.current,
              new faceapi.SsdMobilenetv1Options())
              .withFaceLandmarks()
              .withFaceExpressions();

              if (!imageRef.current) {
                return;
              }

              const displaySize = { 
                width: imageRef.current.width,
                height: imageRef.current.height 
              };

              faceapi.matchDimensions(canvasRef.current, displaySize);
              const resizedDetections = faceapi.resizeResults(detections, displaySize);

              if (useDetections) {
                faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
              }

              if (useExpressions) {
                faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
              }

              if (useLandmarks) {
               faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
              }
        }
    }
    detectFaces()
  }, [modelsLoaded, imageRef, canvasRef, useDetections, useExpressions, useLandmarks])

  return (
    <div style={{position: 'relative'}}>
      <img ref={imageRef} src={exampleImage} crossOrigin='Anonymous' style={{ width: '394px', height: '600px' }} />
      <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0}} />
    </div>
  );
}

export default CodeExample;


