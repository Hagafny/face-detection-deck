import React, { useState, useEffect } from 'react'
import { useSteps } from 'mdx-deck'
import CroppedTile from '../components/CroppedTile'
import { SlideLayout } from '../layouts/SlideLayout'
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import MuiTheme from '../theme/MuiTheme';

const crop1 = 'ron2.jpg'
const crop2 = 'orel.jpg'
const crop3 = 'ron2.jpg'


const TilesContainer = styled.div`
    display: flex;
    flex-directoin: row;
    justify-content: space-between
`

const switchLabel = { inputProps: { 'aria-label': 'Switch demo' } };

const StyledSwitch = styled(Switch)`
  transform: scale(3);
  margin-bottom: 80px;
  margin-top: 30px;
`;

const SwitchContainer = styled.div`
    display: flex;
    justify-content: center;
`

const GoodCropBadCropSlide = () => {
    const [smartCrop, setSmartCrop] = useState(false) 
    const toggleSmartCrop = () => setSmartCrop(!smartCrop)
    const step = useSteps(4)
    
    useEffect(toggleSmartCrop, [step])

return (
    <MuiTheme>
        <SlideLayout title='Good Crop, Bad Crop' justifyContent='center' direction='column' >
            <SwitchContainer> 
             <StyledSwitch {...switchLabel} checked={smartCrop} onChange={toggleSmartCrop} />
            </SwitchContainer>

            <TilesContainer> 
                <CroppedTile smartCrop={smartCrop} imageUrl={crop1} />
                <CroppedTile smartCrop={smartCrop} imageUrl={crop2} />
                <CroppedTile smartCrop={smartCrop} imageUrl={crop3} />
            </TilesContainer>
        </SlideLayout>
</MuiTheme>)
}

export default GoodCropBadCropSlide