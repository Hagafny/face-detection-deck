import React from 'react'

export const SlideLayout = ({ title, justifyContent, screenHeight, direction = 'row', style = {}, children }) => {
    return (
        <div style={{ width: '80vw', height: '100vh' }}>
            <div style={{ marginTop: '90px', marginBottom: '100px'}}>
                <h1 style={{ textAlign: 'center' }}>{title}</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: direction, height: screenHeight ? '100%' : 'auto', justifyContent, ...style }}>
                {children}
            </div>
        </div>
    )
}

