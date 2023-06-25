import React from 'react'
import { ImageDeck } from "../images/ImageDeck";

const ORIGINAL_WIDTH = 400;
const ORIGINAL_HEIGHT = 400;

const Tile = ({ width = ORIGINAL_WIDTH, height = ORIGINAL_HEIGHT, children }) => {
  const innerWidth = Math.round(width - width * (40 / ORIGINAL_WIDTH));
  const innerHeight = Math.round(height - height * (40 / ORIGINAL_HEIGHT));

  return (
    <div style={{ position: 'relative', padding: '1px', backgroundColor: 'white' }} >
      <ImageDeck src='Tile.svg' style={{ width, height }} />

      <div style={{ position: 'absolute', left: 10, top: 10, width: innerWidth, height: innerHeight, overflow: 'none' }}>
        {children}
      </div>
    </div>
  )
}

export default Tile