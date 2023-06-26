import React from 'react'
import { ImageDeck } from '../images/ImageDeck'
import { SlideLayout } from '../layouts/SlideLayout'
 
export const MixtilesSlide = () => {
  return (
    <SlideLayout title="We Help People Create Homes They Love" screenHeight justifyContent='center'>
        <ImageDeck
          src={'homes.png'}
          width={'80%'}
          height={'80%'}
          styles={{ backgroundSize: 'cover'  }}
      />
    </SlideLayout>
  )
}

export default MixtilesSlide
