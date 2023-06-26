import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import base from './base';

const { PRIMARY } = base;

const darkTheme = createTheme({
  palette: {
      primary: {
          main: PRIMARY, 
        },
      mode: 'dark',
  }
});


const MuiTheme = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}> 
     {children}
    </ThemeProvider>
  )
}

export default MuiTheme
