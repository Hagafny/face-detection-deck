import React from 'react'

export const SlideLayout = ({ title, justifyContent, screenHeight, direction = 'row', children }) => {
    return (
        <div style={{ width: '80vw', height: '100vh' }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>{title}</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: direction, height: screenHeight ? '100%' : 'auto', justifyContent }}>
                {children}
            </div>
        </div>
    )
}

