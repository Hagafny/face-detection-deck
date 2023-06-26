import { useEffect, useState } from "react";
import { loadImage } from "../utils/helpers";
import * as faceapi from "face-api.js";

export default function useFaces(imageUrl) {
  const [faces, setFaces] = useState(null);

  useEffect(() => {
    let isResultRelevant = true;

    if (imageUrl) {
      setFaces(null);
      detectFaces(imageUrl).then((faces) => {
        if (isResultRelevant) {
          setFaces(faces);
        }
      });
    }

    return () => {
      isResultRelevant = false;
    };
  }, [imageUrl]);

  return faces;
}

async function detectFaces(imageUrl) {
  const image = await loadImage(imageUrl);
  const result = await faceapi.detectAllFaces(
    image,
    new faceapi.TinyFaceDetectorOptions()
  );

  return result.map((detection) => ({
    x: detection.box.left,
    y: detection.box.top,
    width: detection.box.width,
    height: detection.box.height
  }));
}
