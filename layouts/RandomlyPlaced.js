import React from 'react';

export const RandomlyPlaced = ({ top, left, style = {}, children }) => {
  const containerStyle = {
    position: 'absolute',
    zIndex: 2,
    left: `${left}%`,
    top: `${top}%`,
    ...style,
  };

  return <div style={containerStyle}>{children}</div>;
};