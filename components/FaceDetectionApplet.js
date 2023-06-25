import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

        {/* Image Select */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="imageSelect-label">Image</InputLabel>
            <Select
              labelId="imageSelect"
              id="imageSelect"
              value={imageURL}
              label="Age"
              onChange={(e) => setImageURL(e.target.value)}
            >
              <MenuItem value={1}>Image 1</MenuItem>
              <MenuItem value={2}>Image 2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Model Select */}
        <Box sx={{ minWidth: 120, marginTop: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="modelSelect-label">Face Detection Model</InputLabel>
            <Select
              labelId="modelSelect"
              id="modelSelect"
              value={selectedModel}
              label="Face Detection Model"
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {Object.entries(FACE_DETECTION_MODELS).map(([modelKey, modelName]) => (
                <MenuItem value={modelName}>{modelName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
          <CheckBoxLabelRow checked={drawDetections} onChange={(e) => setDrawDetections(e.target.checked)} label={"Draw Detections"} />
          <CheckBoxLabelRow checked={drawLandmarks} onChange={(e) => setDrawLandmarks(e.target.checked)} label="Draw Landmarks" />
          <CheckBoxLabelRow checked={drawExpressions} onChange={(e) => setDrawExpressions(e.target.checked)} label="Draw Expressions" />
        </div>
      </div>
    </div>
  );
};

const CheckBoxLabelRow = ({ checked, onChange, label }) => (
  <FormControlLabel
    control={
      <Switch checked={checked} onChange={onChange} name={label} />
    }
    label={label}
  />
)

export default FaceDetectionApplet;
