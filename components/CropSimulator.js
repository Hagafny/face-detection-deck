import React, { useCallback, useEffect, useState } from 'react';
import BaseFaceAPIImage from './BaseFaceAPIImage';
import animateRectangles from '../utils/animateRecs';
import * as faceapi from 'face-api.js';

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
  label:'top buffer',
  boxColor: MIXTIELS_PINK
}]

function getBoundingRect(boxes) {
    if (!boxes || boxes.length === 0) {
      return null;  // return null if input is empty
    }
    
    let minX = boxes[0].x;
    let minY = boxes[0].y;
    let maxX = boxes[0].x + boxes[0].width;
    let maxY = boxes[0].y + boxes[0].height;
  
    for (let i = 1; i < boxes.length; i++) {
      minX = Math.min(minX, boxes[i].x);
      minY = Math.min(minY, boxes[i].y);
      maxX = Math.max(maxX, boxes[i].x + boxes[i].width);
      maxY = Math.max(maxY, boxes[i].y + boxes[i].height);
    }
  
    return  {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

function padRect(rect, { top = 0, right = 0, bottom = 0, left = 0 }) {
    return {
      x: rect.x - left,
      y: rect.y - top,
      width: rect.width + left + right,
      height: rect.height + top + bottom
    };
  }

function CropSimulator(faceDetectionProps) {
  const [stage, setStage] = useState(0)
  const [allBoxPhases, setAllBoxPhases] = useState([])
  const [canvas, setCanvas] = useState(null)

  const animateBoxes = useCallback((detections, imageCanvas) => { 
    const boxes = detections.map(detection => detection.detection.box)   
    boxes.forEach((box) => {
        const drawBox = new faceapi.draw.DrawBox(box,  {...BOX_OPTIONS[0]});
        drawBox.draw(imageCanvas);
    }) 

    const stage1 = [...boxes]
    const stage2 = stage1.map((box) => {
        // We add 1/2-face to the top of each face because the face detection API
        // returns only the actual face without the top of the head.
        // This seems to do the job pretty well.
        return padRect(box, {
          top: box.height * 0.5
        });
      });

    const stage3 = [getBoundingRect(stage2)]

    const stage4 = stage2.length > 1 ? stage3.map((box) => {
        // We add 1/2-face to the top of each face because the face detection API
        // returns only the actual face without the top of the head.
        // This seems to do the job pretty well.
        return padRect(box, {
          top: box.height * 0.2
        });
      }) : [...stage3]


    setAllBoxPhases([stage1, stage2, stage3, stage4])
    setCanvas(imageCanvas)

}, [setAllBoxPhases])

useEffect(() => {
    if (stage <= 0 || stage >= 4 || allBoxPhases.length === 0) {
        return
    }

    const startingRect = allBoxPhases[stage-1]
    const endingRect = allBoxPhases[stage]

    animateRectangles(startingRect, endingRect, canvas, BOX_OPTIONS[stage], 1000)

}, [stage, allBoxPhases, canvas])

const onNextAnimationStage = () => {
    setStage(stage + 1)
}

  return(
  <> 
    <BaseFaceAPIImage drawBoxes={animateBoxes} {...faceDetectionProps} />
    <button onClick={onNextAnimationStage}>Go</button>
  </>)
}

export default CropSimulator;