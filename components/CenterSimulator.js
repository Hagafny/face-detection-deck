import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { getServerImage } from '../utils/helpers';
import { cropImage } from '../utils/imageUtils'
import { useSteps } from 'mdx-deck'

const NO_OP = () => {}

const MIXTIELS_PINK = '#eb2371'

const BOX_OPTIONS = {
  label:'Center Crop',
  boxColor: MIXTIELS_PINK
}

const detections = [{
    x: 0,
    y: 130,
    width: 400,
    height: 400
}]

function CenterSimulator({onLastImage = NO_OP, src, ...imageProps}) {
    const imageRef = useRef()
    const canvasRef = useRef()
    const step = useSteps(2)

    useEffect(() => {
      const canvas = canvasRef.current
      if (step === 0) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (step === 1) {
      const img = imageRef.current

      const displaySize = { width: img.width, height: img.height };
      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      resizedDetections.forEach((box) => {
          const drawBox = new faceapi.draw.DrawBox(box, BOX_OPTIONS);
          drawBox.draw(canvas);
      }) 
      }
    if (step === 2) {
        const croppedImage = cropImage(imageRef.current, {width: 2160, height: 2160, x: 0, y: 840});
        onLastImage(croppedImage);
    }

    }, [step, detections, imageRef, canvasRef])
 
     return (
      <div style={{position: 'relative'}}>
        {<img ref={imageRef} src={getServerImage(src)} crossOrigin='Anonymous' alt="" {...imageProps} />}
        <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0}} />
    </div>
  );
}
export default CenterSimulator;