import React from 'react'

export const SlideLayout = ({ title, direction = 'row', children }) => {
    return (<div style={{ width: '100vw', height: '100vh' }}>
        <div style={{height: '10%'}}>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: direction }}>
            {children}
        </div>
    </div>
    )
}