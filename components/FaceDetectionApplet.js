import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { getServerImage } from '../utils/helpers';
import useFaceApiModels from '../hooks/useFaceApiModels';
import theme from '../theme/base';

const FACE_DETECTION_MODELS = {
  TINY: 'Tiny Face Detector',
  SSD: 'SSD Mobilenet V1',
};

const tinyFaceDetectorInputSizeOptions = [128, 160, 224, 320, 416, 512, 608];

const detectionBoxOptions = {
  boxColor: theme.PRIMARY,
};

const FaceDetectionApplet = () => {
  const [imageURL, setImageURL] = useState('1');
  const modelsLoaded = useFaceApiModels();
  const [selectedModel, setSelectedModel] = useState(FACE_DETECTION_MODELS.SSD);
  const [drawDetections, setDrawDetections] = useState(false);
  const [drawLandmarks, setDrawLandmarks] = useState(false);
  const [drawExpressions, setDrawExpressions] = useState(false);
  const [inputSize, setInputSize] = useState(512);
  const [scoreThreshold, setScoreThreshold] = useState(0.5);
  const [minConfidence, setMinConfidence] = useState(0.5);

  const imgRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    if (!modelsLoaded) return;
    const detectFaces = async () => {
      let options;
      if (selectedModel === FACE_DETECTION_MODELS.SSD) {
        options = new faceapi.SsdMobilenetv1Options({ minConfidence });
      } else {
        options = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
      }

      const detections = await faceapi.detectAllFaces(imgRef.current, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!imgRef.current) {
        return
      }

      const displaySize = { width: imgRef.current.width, height: imgRef.current.height };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      if (drawDetections) faceapi.draw.drawDetections(canvasRef.current, resizedDetections, detectionBoxOptions);
      if (drawLandmarks) faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      if (drawExpressions) faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    };
    detectFaces();
  }, [modelsLoaded, selectedModel, drawDetections, drawLandmarks, drawExpressions, imageURL, inputSize, scoreThreshold, minConfidence]);

  const handleInputSizeChange = (e) => {
    setInputSize(parseInt(e.target.value));
  };

  const handleScoreThresholdChange = (e) => {
    setScoreThreshold(parseFloat(e.target.value));
  };

  const handleMinConfidence = (e) => {
    setMinConfidence(parseFloat(e.target.value));
  };

  return (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', maxWidth: '1200px', columnGap: '5rem', alignItems: 'center' }}>
  <div style={{ position: 'relative' }}>
    <img ref={imgRef} src={getServerImage(`e${imageURL}.jpg`)} alt="" crossOrigin="Anonymous" width="600" />
    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '15px'}} htmlFor="imageSelect">Image:</label>
      <select id="imageSelect" value={imageURL} onChange={(e) => setImageURL(e.target.value)}>
        <option>1</option>
        <option>2</option>
      </select>
    </div>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '15px'}}  htmlFor="modelSelect">Face Detection Model:</label>
      <select id="modelSelect" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        {Object.entries(FACE_DETECTION_MODELS).map(([modelKey, modelName]) => (
          <option key={modelKey}>{modelName}</option>
        ))}
      </select>
    </div>

    {selectedModel === FACE_DETECTION_MODELS.TINY && (
      <div style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
        <div>
        <label style={{ marginRight: '15px'}} htmlFor="inputSizeSelect">Input Size:</label>
        <select id="inputSizeSelect" value={inputSize} onChange={handleInputSizeChange}>
          {tinyFaceDetectorInputSizeOptions.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
        </div>
<div>
        <label style={{ marginRight: '15px'}} htmlFor="scoreThresholdRange">Score Threshold:</label>
        <input 
          id="scoreThresholdRange"
          type="range"
          min={0}
          max={0.99}
          step={0.03}
          value={scoreThreshold}
          onChange={handleScoreThresholdChange}
        />
        <div>Value: {scoreThreshold}</div>
        </div>
      </div>
    )}

    {selectedModel === FACE_DETECTION_MODELS.SSD && (
      <div style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
        <label style={{ marginRight: '15px'}} htmlFor="minConfidenceRange">Min Confidence:</label>
        <input style={{ marginRight: '15px'}}
          id="minConfidenceRange"
          type="range"
          min={0}
          max={0.99}
          step={0.03}
          value={minConfidence}
          onChange={handleMinConfidence}
        />
        <div>Value: {minConfidence}</div>
      </div>
    )}

    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
      <CheckBoxLabelRow checked={drawDetections} onChange={(e) => setDrawDetections(e.target.checked)}>Draw Detections</CheckBoxLabelRow>
      <CheckBoxLabelRow checked={drawLandmarks} onChange={(e) => setDrawLandmarks(e.target.checked)}>Draw Landmarks</CheckBoxLabelRow>
      <CheckBoxLabelRow checked={drawExpressions} onChange={(e) => setDrawExpressions(e.target.checked)}>Draw Expressions</CheckBoxLabelRow>
    </div>
  </div>
</div>
  );
};

const CheckBoxLabelRow = ({ checked, onChange, children}) => (
  <label style={{display: 'flex'}}>
  <input style={{ marginRight: '15px'}}
    type="checkbox"
    checked={checked}
    onChange={onChange}
  />
  {children}
</label>
)

export default FaceDetectionApplet;
