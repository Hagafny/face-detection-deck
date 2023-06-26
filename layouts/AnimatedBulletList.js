import React from 'react';
import { Steps } from 'mdx-deck';

export const AnimatedBulletList = ({ children }) => (
  <div> 
    <Steps>
      {React.Children.map(children, (child, index) => {
            return <div key={index} style={{
              opacity: 0,
              animation: 'fadeIn 0.5s forwards'
            }}>
              <div style={{ marginBottom: '50px', fontSize: '45px'}}>• {child}</div>
            </div>
          })
      }
    </Steps>
  </div>
);
