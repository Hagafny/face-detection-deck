import React from 'react'
import { AnimatedBulletList } from '../layouts/AnimatedBulletList'
import { SlideLayout } from '../layouts/SlideLayout'

const SmartCropSlide = () => (
<SlideLayout title='Smart Crop' direction='column' screenHeight >
    <AnimatedBulletList>
        <span>Produces a crop that best encapsulates the scene </span>
        <span>Does not hurt our current experience </span>
        <span> Works well on a wide range of modern mobile devices </span>
    </AnimatedBulletList>
</SlideLayout>
)

export default SmartCropSlide