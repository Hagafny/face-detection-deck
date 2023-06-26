import React, { useEffect  } from 'react';
import useDetections from '../hooks/useDetections';
import { getServerImage } from '../utils/helpers';

function BaseFaceAPIImage({ src, drawBoxes, faceDetector, serverImage = true, ...imageProps }) {
  const { detections, imageRef, canvasRef } = useDetections(src, faceDetector) 
  const imageURL = serverImage ? getServerImage(src) : src

  useEffect(() => {
    if (detections.length > 0) {
        drawBoxes(detections, canvasRef.current, imageRef.current)
    }

    return () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [detections, drawBoxes, canvasRef.current, imageRef.current]);

  return (
    <div style={{position: 'relative'}}>
      {src && <img ref={imageRef} src={imageURL} crossOrigin='Anonymous' alt="" {...imageProps} />}
      <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0}} />
    </div>
  );
}

export default BaseFaceAPIImage;


