import React, { useCallback, useEffect, useState } from 'react';
import BaseFaceAPIImage from './BaseFaceAPIImage';
import animateRectangles from '../utils/animateRecs';
import * as faceapi from 'face-api.js';
import { Button } from './Button/Button';

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


  export function unionRects(...rects) {
    const copiedRects = [...rects];
    let mergedRect = copiedRects.shift();
    while (copiedRects.length) {
      const otherRect = copiedRects.shift();
  
      const xMin = Math.min(mergedRect.x, otherRect.x);
      const yMin = Math.min(mergedRect.y, otherRect.y);
      const xMax = Math.max(
        mergedRect.x + mergedRect.width,
        otherRect.x + otherRect.width
      );
      const yMax = Math.max(
        mergedRect.y + mergedRect.height,
        otherRect.y + otherRect.height
      );
  
      mergedRect = {
        x: xMin,
        y: yMin,
        width: xMax - xMin,
        height: yMax - yMin
      };
    }
  
    return mergedRect;
  }

  const NO_OP = () => {}
function padRect(rect, { top = 0, right = 0, bottom = 0, left = 0 }) {
    return {
      x: rect.x - left,
      y: rect.y - top,
      width: rect.width + left + right,
      height: rect.height + top + bottom
    };
  }

function CropSimulator({specificStage = -1, onLastImage = NO_OP, ...faceDetectionProps}) {
  const [stage, setStage] = useState(0)
  const [allBoxPhases, setAllBoxPhases] = useState([])
  const [canvas, setCanvas] = useState(null)
  const [originalImage, setOriginalImage] = useState(null)

  const animateBoxes = useCallback((detections, imageCanvas, actualImage) => { 
    const boxes = detections.map(detection => detection.detection.box)   
    console.log('faces', boxes)

    const faceDetectionBoxes = [...boxes]
    const upperBufferBoxes = faceDetectionBoxes.map((box) => {
        // We add 1/2-face to the top of each face because the face detection API
        // returns only the actual face without the top of the head.
        // This seems to do the job pretty well.
        return padRect(box, {
          top: box.height * 0.5
        });
      });
      console.log('faces after buffer', upperBufferBoxes)

    const boundingRect = unionRects(...upperBufferBoxes)
    const smartCrop = cropToFitFaces(actualImage, boundingRect) 
    
    console.log('allFacesRect', boundingRect)
    console.log('smartCrop',smartCrop)
  
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

const onNextAnimationStage = () => {
  const nextStage = stage + 1  
  if (nextStage > allBoxPhases.length - 1) { // after final stage 
    const finalRect = allBoxPhases[allBoxPhases.length -1][0]
    console.log('finalRect', finalRect)
    onLastImage(cropImage(originalImage, finalRect))
  } 

  setStage(nextStage)
}

  return(
  <> 
    <BaseFaceAPIImage drawBoxes={animateBoxes} {...faceDetectionProps} />
    <div style={{ marginTop: '20px'}}>
      {specificStage === -1 && <Button onClick={onNextAnimationStage} text='Next Step'/>}
    </div>
  </>)
}

export function cropToFitFaces(image, allFacesRect) {
  const imageAspectRatio = image.naturalWidth / image.naturalHeight;
  let width, height, x, y;

  if (imageAspectRatio >= 1) {
    width = image.naturalWidth * (1 / imageAspectRatio);
    height = image.naturalHeight;
    y = 0;

    // Center crop on the faces rect
    x = allFacesRect.x + allFacesRect.width / 2 - width / 2;

    // Make sure the crop is within the image
    x = clampValue({
      value: x,
      min: 0,
      max: image.naturalWidth - width
    });
  } else {
    width = image.naturalWidth;
    height = image.naturalHeight * imageAspectRatio;
    x = 0;

    // Add some buffer on the top of the face, additional 20% seem to be a good proportion that looks pleasant.
    const paddingTop = allFacesRect.height * 0.2;
    y = allFacesRect.y - paddingTop;

    y = clampValue({
      value: y,
      min: 0,
      max: Math.max(
        image.naturalHeight - height,
        allFacesRect.y + allFacesRect.height - height,
        0
      )
    });
  }

  return {
    ...allFacesRect,
    width: Math.round(width),
    height: Math.round(height),
    x: Math.round(x),
    y: Math.round(y)
  };
}


function clampValue({ value, min, max }) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function cropImage(image, cropRect) {
  const canvas = document.createElement("canvas");
  canvas.width = cropRect.width;
  canvas.height = cropRect.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    cropRect.x,
    cropRect.y,
    cropRect.width,
    cropRect.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas.toDataURL();
}

export default CropSimulator;