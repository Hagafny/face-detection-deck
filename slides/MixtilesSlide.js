import React from 'react'
import { ImageDeck } from '../images/ImageDeck'
import { RandomlyPlaced } from '../layouts/RandomlyPlaced'
import { SlideLayout } from '../layouts/SlideLayout'
 
export const MixtilesSlide = () => {
  return (
    <SlideLayout title="We Help People Create Homes They Love" screenHeight justifyContent>
        <ImageDeck
          src={'mixtiles_pic.png'}
          width={'80%'}
          height={'80%'}
          styles={{ backgroundSize: 'cover',  }}
      />
    </SlideLayout>
  )
}

export default MixtilesSlide