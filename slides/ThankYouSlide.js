import React from 'react';
import { ImageDeck } from '../images/ImageDeck.js';
import FaceAPIImage from '../components/FaceAPIImage.js';
import * as faceapi from 'face-api.js'

const PICTURE_CODE = 'thankyou'

const mixtilesImage = <ImageDeck style={{ width: '128px', height: '128px' }} src='mixtiles.png'/>
const twitterImage = <ImageDeck style={{ width: '81px', height: '128px' }} src='twitter.png'/>
const potImage = <ImageDeck style={{ width: '128px', height: '128px' }} src='pot.png'/>
const faceDetector =  new faceapi.SsdMobilenetv1Options({ minConfidence: 0.3 });

const ThankYouSlide = () => (
  <> 
    <h1>Thank You For Listening!</h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        className='logos'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Logo imageComp={mixtilesImage}><a href="www.mixtiles.com/dev" target="_blank" rel="noreferrer">www.mixtiles.com/dev</a></Logo>
        <Logo imageComp={twitterImage}><a href="https://twitter.com/TheGafny" target="_blank" rel="noreferrer">@TheGafny</a></Logo>  
        <Logo imageComp={potImage}><a href="https://proofoftalk.com" target="_blank" rel="noreferrer">Proof of Talk Podcast</a></Logo>
      </div>
          <FaceAPIImage
              faceDetector={faceDetector} 
              drawDetections={true}
              drawExpressions={true}
              src={`https://res.cloudinary.com/mixtiles/image/upload/v1687765736/reactNext/${PICTURE_CODE}.jpg`}
              serverImage={false}
              style={{width: '800px', height: '600px'}}
           />
    </div>
    </>
  );

const Logo = ({
  imageComp,
  children
}) => {
  return (
    <div
      style={{
        margin: '40px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      {imageComp}
      {children}
    </div>
  );
    }

export default ThankYouSlide