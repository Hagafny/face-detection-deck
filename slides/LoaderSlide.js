import React, { useState, useEffect } from 'react';
import FaceExpressionImage from '../components/FaceExpressionImage';
import useFaceApiModels from '../hooks/useFaceApiModels';
import { getServerImage, loadImage } from '../utils/helpers';

const imageURL = getServerImage('ron.png')

function LoaderSlide() {
  const modelsLoaded = useFaceApiModels()
  const [loadedImage, setLoadedImage] = useState(null)

  useEffect(() => {
    loadImage(imageURL).then((image) =>{
      console.log('image', image)
      setLoadedImage(image)
    })
  }, [])


  if (!modelsLoaded || !loadedImage) {
    return <div>Loading...</div>
  }

  return (
     <FaceExpressionImage src={imageURL} drawFaceExpressions={true} drawDetections={true} crossOrigin='Anonymous' alt="Uploaded content" style={{width: '400px', height: '400px'}} />  
  );
  }

export default LoaderSlide;
