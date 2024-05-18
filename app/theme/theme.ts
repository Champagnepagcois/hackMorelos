"use client"
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#001dbd',
    },
    secondary: {
      main: '#c30a07',
    },
    info: {
      main: '#0288d1',
    },
  },
});