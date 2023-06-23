const SERVER_PORT = 5000

export function loadImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
  
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
  
      image.src = imageUrl;
    });
  }

export const getServerURL = () => `http://localhost:${SERVER_PORT}`

export const getServerImage = imgSrc => `${getServerURL()}/${imgSrc}`