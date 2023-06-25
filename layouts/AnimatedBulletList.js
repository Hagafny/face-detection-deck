import React from 'react';
import { Steps } from 'mdx-deck';

export const AnimatedBulletList = ({ children }) => (
  <div style={{ marginLeft: '300px'}}> 
    <Steps>
      {React.Children.map(children, (child, index) => {
            return <div key={index} style={{
              opacity: 0,
              animation: 'fadeIn 0.5s forwards',
              animationDelay: `${index * 0.3}s`
            }}>
              <div style={{ marginBottom: '20px'}}>• {child}</div>
            </div>
          })
      }
    </Steps>
  </div>
);
