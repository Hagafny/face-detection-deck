import React from 'react';
import { ZoomSteps } from '../components/ZoomSteps/ZoomSteps.js';
import { DECK_IMAGES } from '../images/ImageDeck';
import rocket from '../images/rocket.png';
import seo from '../images/seo.png';
import marketing from '../images/marketing.png';
import { Image } from 'mdx-deck';



export const AnimatedIconsSlide = ({icons = []}) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'grid',
                gridTemplateColumns: `repeat(${icons.length}, 1fr)`,
                gridTemplateRows: 'repeat(1, 1fr)',
                gridColumnGap: '0px',
                gridRowGap: '0px',
            }}
        >
            <ZoomSteps>
                {icons.map((icon) => (
                    <GridWrapper image={icon} />
                ))}                
            </ZoomSteps>
        </div>
    );
};

const GridWrapper = ({ image }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Image
            src={image}
            width={'128px'}
            height={'128px'}
            style={{ backgroundSize: 'contain' }}
        />
    </div>
);
