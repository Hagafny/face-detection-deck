import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const defaultFaceDetector = new faceapi.TinyFaceDetectorOptions()

const useDetections = (imageSrc, faceDetector = defaultFaceDetector) => {
    const imageRef = useRef();
    const canvasRef = useRef();
    const [detections, setDetections] = useState([])
    
    useEffect(() => {
      let isResultRelevant = true;
      const runFaceDetection = async () => {
        const img = imageRef.current
        const canvas = canvasRef.current
        
        if (imageSrc) {
         const detections = await faceapi.detectAllFaces(img, faceDetector)
                                  .withFaceLandmarks()
                                  .withFaceExpressions()
        
          if (detections?.length > 0 && img?.width ) {
            const displaySize = { width: img.width, height: img.height };
            faceapi.matchDimensions(canvas, displaySize);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            
            if (isResultRelevant) {
              setDetections(resizedDetections)
            }

            return () => {
              isResultRelevant = false;
            };
          }
        }
      };
      runFaceDetection();
    }, [imageSrc, faceDetector, canvasRef, imageRef]);
  
    return {
       detections, imageRef, canvasRef,
    }
  }
  
  export default useDetections