import React, { useState } from 'react'
import { SideBySide } from '../layouts/SideBySide'
import { SlideLayout } from '../layouts/SlideLayout'
import Tile from '../components/Tile'
import CropSimulator from '../components/CropSimulator.js'

const imageURL = 'ron2.jpg'

const SimulatorSlide = () => {
  const [croppedImage, setCroppedImage] = useState(null)

  return (

    <>
            <CropSimulator src={imageURL} style={{width:'400px', height: '600px'}} onLastImage={setCroppedImage} />
            <Tile width={300} height={300}>
               <img style={{ width: "100%" }} src={croppedImage} />
            </Tile>
</>
        
  )
}

export default SimulatorSlide
