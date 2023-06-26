const DISPLAY_SIZE = { naturalWidth: 400, naturalHeight: 600 }


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

// Scale bounding rect to fit original image dimensions
export function scaleUpBoundingRect ({
rect,
originalImageWidth,
originalImageHeight,
}) {

const scale = originalImageWidth / DISPLAY_SIZE.naturalWidth
return {
    x: rect.x * scale,
    y: rect.y * scale,
    width: rect.width * scale,
    height: rect.height * scale,
}
}

export function padRect(rect, { top = 0, right = 0, bottom = 0, left = 0 }) {
    return {
      x: rect.x - left,
      y: rect.y - top,
      width: rect.width + left + right,
      height: rect.height + top + bottom
    };
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

export function clampValue({ value, min, max }) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

export function cropImage(image, cropRect) {
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


export function smartCropAlgorithm (boxes) {
    const upperBufferBoxes = boxes.map((box) => {
        // We add 1/2-face to the top of each face because the face detection API
        // returns only the actual face without the top of the head.
        // This seems to do the job pretty well.
        return padRect(box, {
          top: box.height * 0.5
        });
      });

    const boundingRect = unionRects(...upperBufferBoxes)
    return cropToFitFaces(DISPLAY_SIZE, boundingRect)

} 

export function cropToFitFacesOrel(image, faces) {
    const facesRects = faces.map((face) => {
      // We add 1/2-face to the top of each face because the face detection API
      // returns only the actual face without the top of the head.
      // This seems to do the job pretty well.
      return padRect(face, {
        top: face.height * 0.5
      });
    });
  
    const allFacesRect = unionRects(...facesRects);
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    let width, height, x, y;
    if (imageAspectRatio >= 1) {
      width = image.naturalWidth * (1 / imageAspectRatio);
      height = image.naturalHeight;
      y = 0;
  
      // Center crop on the faces rect
      console.log(allFacesRect);
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
      width: Math.round(width),
      height: Math.round(height),
      x: Math.round(x),
      y: Math.round(y)
    };
  }

  export function cropToCenterCenterOrel(image) {
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    let width, height, x, y;
  
    if (sourceRatio >= 1) {
      width = image.naturalWidth * (1 / sourceRatio);
      height = image.naturalHeight;
      x = (image.naturalWidth - width) / 2;
      y = 0;
    } else {
      width = image.naturalWidth;
      height = image.naturalHeight * sourceRatio;
      x = 0;
      y = (image.naturalHeight - height) / 2;
    }
  
    return {
      width: Math.round(width),
      height: Math.round(height),
      x: Math.round(x),
      y: Math.round(y)
    };
  }