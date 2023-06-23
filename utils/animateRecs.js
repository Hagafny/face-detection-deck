import * as faceapi from 'face-api.js';

function animateRectangles(startRects, endRects, canvas, boxOptions, duration = 2000) {
    const context = canvas.getContext('2d');
  
    const numAnimations = Math.min(startRects.length, endRects.length);
    const animations = Array(numAnimations).fill().map((_, i) => ({
      startRect: startRects[i],
      endRect: endRects[i],
      progress: 0,
    }));
  
    let startTime = null;
  
    const animateBox = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
  
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
  
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      animations.forEach(animation => {
        animation.progress = progress;
  
        const interpolatedRect = {
          x: animation.startRect.x + progress * (animation.endRect.x - animation.startRect.x),
          y: animation.startRect.y + progress * (animation.endRect.y - animation.startRect.y),
          width: animation.startRect.width + progress * (animation.endRect.width - animation.startRect.width),
          height: animation.startRect.height + progress * (animation.endRect.height - animation.startRect.height)
        };
  
        // Draw the rectangle using faceapi.draw.DrawBox
        const box = new faceapi.draw.DrawBox(interpolatedRect, { ...boxOptions});
        box.draw(canvas);
      });
  
      // Draw any extra rectangles without animation.
      if (endRects.length > startRects.length && progress === 1) {
        endRects.slice(startRects.length).forEach(rect => {
          console.log('rect', rect)

          const box = new faceapi.draw.DrawBox(rect, { ...boxOptions });
          box.draw(canvas);
        });
      }
  
      if (progress < 1) {
        requestAnimationFrame(animateBox);
      }
    }
  
    requestAnimationFrame(animateBox);
  }
      
  export default animateRectangles