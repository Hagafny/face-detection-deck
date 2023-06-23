import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react'
import { getServerURL } from '../utils/helpers';

const serverURL = getServerURL()
const modelsFolderURL = `${serverURL}/models`

const useFaceApiModels = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false)

  useEffect(() => {
      const loadModels = async () => {
        await Promise.all([
          faceapi.loadTinyFaceDetectorModel(modelsFolderURL),
          faceapi.loadFaceLandmarkModel(modelsFolderURL),
          faceapi.loadFaceExpressionModel(modelsFolderURL)
        ])

        setModelsLoaded(true)
      };

      loadModels();
    }, []);

      return modelsLoaded
}

export default useFaceApiModels