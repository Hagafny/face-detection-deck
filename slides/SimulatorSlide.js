import React, { useState } from 'react'
import Tile from '../components/Tile'
import CropSimulator from '../components/CropSimulator.js'

const SimulatorSlide = ({ imageURL}) => {
  const [croppedImage, setCroppedImage] = useState(null)

  return (
    <div style={{ textAlign: 'center', height: '100vh'}}>
    <h1>Smart Crop</h1>
    <div style={{ display: 'flex', gap: '200px', alignItems: 'center' }}>
      <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CropSimulator src={imageURL} style={{width:'400px', height: '600px'}} onLastImage={setCroppedImage} />
      </div>
            <Tile width={300} height={300}>
               <img style={{ width: "100%" }} alt='' crossOrigin='Anonymous' src={croppedImage} />
            </Tile>
</div>

</div>
        
  )
}

export default SimulatorSlide
