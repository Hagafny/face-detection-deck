import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                colorPrimary: {
                    "&.Mui-checked": {
                        // Controls checked color for the thumb
                        color: '#FF0277',
                    }
                },
            }
        }
    }
});

export const SlideLayout = ({ title, direction = 'row', children }) => {
    return (<ThemeProvider theme={darkTheme}>
        <div style={{ width: '80vw', height: '100vh' }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>{title}</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: direction }}>
                {children}
            </div>
        </div>
    </ThemeProvider>
    )
}

