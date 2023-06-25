import React from 'react';
import MuiButton from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import muiTheme from '../../theme/mui';

export const Button = ({ text, onClick, type }) => (
  <ThemeProvider theme={muiTheme}>
    <MuiButton text={text} onClick={onClick} variant={type}>
      {text}
    </MuiButton>
  </ThemeProvider>
);
