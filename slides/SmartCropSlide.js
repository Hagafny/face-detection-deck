import React from 'react'
import { AnimatedBulletList } from '../layouts/AnimatedBulletList'
import { SlideLayout } from '../layouts/SlideLayout'

const SmartCropSlide = () => (
<SlideLayout title='🔥 Smart Crop 🔥' direction='column' screenHeight>
    <AnimatedBulletList>
        <span>Produces a crop that best captures the scene</span>
        <span>Works well on a wide range of modern mobile devices </span>
        <span>Would not hurt our current experience </span>
    </AnimatedBulletList>
</SlideLayout>
)

export default SmartCropSlide