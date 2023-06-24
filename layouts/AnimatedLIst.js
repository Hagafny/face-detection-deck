import React from 'react';
import { Steps } from 'mdx-deck';

export const AnimatedBulletList = ({ items }) => (
  <Steps>
    {items.map((item, index) => (
      <div key={index} style={{
        opacity: 0,
        animation: 'fadeIn 0.5s forwards',
        animationDelay: `${index * 0.3}s` // Change this to control delay between each item
      }}>
        • {item}
      </div>
    ))}
  </Steps>
);
