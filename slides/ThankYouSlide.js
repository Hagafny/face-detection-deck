import React from 'react';
import { ImageDeck } from '../images/ImageDeck.js';

const mixtilesImage = <ImageDeck style={{ width: '128px', height: '128px' }} src='mixtiles.png'/>
const twitterImage = <ImageDeck style={{ width: '81px', height: '128px' }} src='twitter.png'/>
const potImage = <ImageDeck style={{ width: '128px', height: '128px' }} src='pot.png'/>

export const ThankYouSlide = () => {
  return (
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
      hi :)
    </div>
  );
};

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
};
