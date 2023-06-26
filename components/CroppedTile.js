import React, { useEffect, useState } from "react";
import { getServerImage, loadImage } from '../utils/helpers'
import { cropImage, cropToFitFacesOrel, cropToCenterCenterOrel } from '../utils/imageUtils'
import Tile from "./Tile";
import useFaces from "../hooks/useFaces";

const CroppedTile = ({ smartCrop, imageUrl, ...imageProps}) => {
    const serverImageURL = getServerImage(imageUrl)
    const [croppedImageUrl, setCroppedImageUrl] = useState();
    const faces = useFaces(serverImageURL);
    
    useEffect(() => {
        if (smartCrop && faces?.length > 0) {
          loadImage(serverImageURL).then((image) => {
            const cropRect = cropToFitFacesOrel(image, faces);
            const croppedImage = cropImage(image, cropRect);
            setCroppedImageUrl(croppedImage);
          });
        } else {
          loadImage(serverImageURL).then((image) => {
            const cropRect = cropToCenterCenterOrel(image);
            const croppedImage = cropImage(image, cropRect);
            setCroppedImageUrl(croppedImage);
          });
        }
      }, [serverImageURL, faces, smartCrop]);

      
      return (
        <Tile width={300} height={300}>
            {croppedImageUrl && (
            <img style={{ width: "100%" }} src={croppedImageUrl} alt='' crossOrigin='Anonymous' {...imageProps} />
            )}
      </Tile>
      )
}

export default CroppedTile
