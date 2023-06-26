import React, { useCallback, useEffect, useState } from 'react';
import BaseFaceAPIImage from './BaseFaceAPIImage';
import animateRectangles from '../utils/animateRecs';
import * as faceapi from 'face-api.js';
import { Button } from './Button/Button';
import { padRect, unionRects, scaleUpBoundingRect, cropImage, cropToFitFaces } from '../utils/imageUtils'
import { useSteps } from 'mdx-deck'

const NO_OP = () => {}

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

function CropSimulator({specificStage = -1, onLastImage = NO_OP, ...faceDetectionProps}) {
  const [stage, setStage] = useState(0)
  const [allBoxPhases, setAllBoxPhases] = useState([])
  const [canvas, setCanvas] = useState(null)
  const [originalImage, setOriginalImage] = useState(null)
  const step = useSteps(4)

  const animateBoxes = useCallback((detections, imageCanvas, actualImage) => { 
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

    const firstDrawIndex = specificStage !== -1 ? specificStage : 0

        allStages[firstDrawIndex].forEach((box) => {
          const drawBox = new faceapi.draw.DrawBox(box,  {...BOX_OPTIONS[firstDrawIndex]});
          drawBox.draw(imageCanvas);
      }) 
  
    setAllBoxPhases(allStages)
    setCanvas(imageCanvas)
    setOriginalImage(actualImage)

}, [specificStage, setAllBoxPhases])

useEffect(() => {
    if (specificStage !== -1 || stage <= 0 || stage >= 4 || allBoxPhases.length === 0) {
        return
    }
 
    const startingRect = allBoxPhases[stage-1]
    const endingRect = allBoxPhases[stage]

    animateRectangles(startingRect, endingRect, canvas, BOX_OPTIONS[stage], 1000)

}, [stage, allBoxPhases, canvas, specificStage])

useEffect(() => {
  if (specificStage !== -1) return
  if (allBoxPhases.length > 0 && step > allBoxPhases.length - 1) { // after final stage 
    const finalRect = allBoxPhases[allBoxPhases.length -1][0]
    const scaledBoundingRect = scaleUpBoundingRect({
      rect: finalRect,
      originalImageWidth: originalImage.naturalWidth,
      originalImageHeight: originalImage.naturalHeight,
    })
    onLastImage(cropImage(originalImage, scaledBoundingRect))
  } else {
    setStage(step)
  }
}, [step,allBoxPhases])

  return <BaseFaceAPIImage drawBoxes={animateBoxes} {...faceDetectionProps} />
}
export default CropSimulator;