import React, { useState } from 'react'
import { SideBySide } from '../layouts/SideBySide'
import { SlideLayout } from '../layouts/SlideLayout'
import Tile from '../components/Tile'
import CropSimulator from '../components/CropSimulator.js'

const imageURL = 'ron2.jpg'

const SimulatorSlide = () => {
  const [croppedImage, setCroppedImage] = useState(null)

  return (

    <div style={{ display: 'flex', gap: '50px' }}>
      <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CropSimulator src={imageURL} style={{width:'400px', height: '600px'}} onLastImage={setCroppedImage} />
      </div>
            <Tile width={300} height={300}>
               <img style={{ width: "100%" }} src={croppedImage} />
            </Tile>
</div>
        
  )
}

export default SimulatorSlide
