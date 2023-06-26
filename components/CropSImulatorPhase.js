import React, { useCallback } from 'react';
import BaseFaceAPIImage from './BaseFaceAPIImage';
import * as faceapi from 'face-api.js';
import { padRect, unionRects, cropToFitFaces } from '../utils/imageUtils'

const MIXTIELS_PINK = '#eb2371'

const BOX_OPTIONS = [{
  label:'single face',
  boxColor: MIXTIELS_PINK
},{
  label:'top buffer',
  boxColor: MIXTIELS_PINK
},{
  label:'faces union',
  boxColor: MIXTIELS_PINK
},{
  label:'smart crop',
  boxColor: MIXTIELS_PINK
}]

const DISPLAY_SIZE = { naturalWidth: 400, naturalHeight: 600 }

function CropSimulatorPhase({phase, ...faceDetectionProps}) {
    console.log('faceDetectionProps', faceDetectionProps)

  const drawTheBox = useCallback((detections, imageCanvas) => { 
    const boxes = detections.map(detection => detection.detection.box)   

    const faceDetectionBoxes = [...boxes]
    const upperBufferBoxes = faceDetectionBoxes.map((box) => {
        // We add 1/2-face to the top of each face because the face detection API
        // returns only the actual face without the top of the head.
        // This seems to do the job pretty well.
        return padRect(box, {
          top: box.height * 0.5
        });
      });

    const boundingRect = unionRects(...upperBufferBoxes)
    const smartCrop = cropToFitFaces(DISPLAY_SIZE, boundingRect)
    
    const allStages = [faceDetectionBoxes, upperBufferBoxes, [boundingRect], [smartCrop]]
    const stageRects = allStages[phase]

    stageRects.forEach((box) => {
        const drawBox = new faceapi.draw.DrawBox(box,  {...BOX_OPTIONS[phase]});
        drawBox.draw(imageCanvas);
    }) 
}, [phase])

  return <BaseFaceAPIImage drawBoxes={drawTheBox} {...faceDetectionProps} />
}
export default CropSimulatorPhase;