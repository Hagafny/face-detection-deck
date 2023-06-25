import React from 'react';
import { Image } from 'mdx-deck';
import { getServerImage } from '../utils/helpers';

export const DECK_IMAGES = {
  MIXTILES: 'mixtiles.png',
  TWITTER: 'twitter.png',
  POT: '../images/pot.png',
  MARKETING: 'marketing.png',
  ROCKET: 'rocket.png',
  SEO: 'seo.png',
};

export const ImageDeck = ({ src, width, height, style = {} }) => {
  return (
    <Image
      src={getServerImage(src)}
      width={width}
      height={height}
      style={{ backgroundSize: 'contain', ...style }}
    />
  );
};
