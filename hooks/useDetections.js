import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const useDetections = (imageSrc) => {
    const imageRef = useRef();
    const canvasRef = useRef();
    const [detections, setDetections] = useState([])
    
    useEffect(() => {
      const runFaceDetection = async () => {
        if (imageSrc) {
          const img = imageRef.current;
          const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                                  .withFaceLandmarks()
                                  .withFaceExpressions()
        
          if (detections?.length > 0) {
            const canvas = canvasRef.current;
            const displaySize = { width: img.width, height: img.height };
            faceapi.matchDimensions(canvas, displaySize);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            setDetections(resizedDetections)
          }
        }
      };
      runFaceDetection();
    }, [imageSrc, canvasRef, imageRef]);
  
    return {
       detections, imageRef, canvasRef,
    }
  }
  
  export default useDetections