import React from 'react';
import { Image } from 'mdx-deck';

import mixtiles from '../images/mixtiles.png';
import pot from '../images/pot.png';
import twitter from '../images/twitter.png';

export const DECK_IMAGES = {
  MIXTILES: 'mixtiles.png',
  TWITTER: 'twitter.png',
  POT: '../images/pot.png',
};

const IMAGES = {
  [DECK_IMAGES.MIXTILES]: mixtiles,
  [DECK_IMAGES.TWITTER]: twitter,
  [DECK_IMAGES.POT]: pot,
};

export const ImageDeck = ({ deckImage, width, height, style = {} }) => {
  return (
    <Image
      src={IMAGES[deckImage]}
      width={width}
      height={height}
      style={{ backgroundSize: 'contain', ...style }}
    />
  );
};
