import React, { useEffect  } from 'react';
import useDetections from '../hooks/useDetections';
import { getServerImage } from '../utils/helpers';

function BaseFaceAPIImage({ src, drawBoxes, faceDetector, ...imageProps }) {
  const { detections, imageRef, canvasRef } = useDetections(src, faceDetector) 
  const imageURL = getServerImage(src)

  useEffect(() => {
    if (detections.length > 0) {
        drawBoxes(detections, canvasRef.current)
    }
  }, [detections, drawBoxes]);

  return (
    <div style={{position: 'relative'}}>
      {src && <img ref={imageRef} src={imageURL} crossOrigin='Anonymous' alt="" {...imageProps} />}
      <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0}} />
    </div>
  );
}

export default BaseFaceAPIImage;


