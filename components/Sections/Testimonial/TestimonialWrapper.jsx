'use client';

import React from 'react';
import Testinomial from './Testinomial';

import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme();
export default function TestimonialWrapper({ testinomial }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Testinomial testinomial={testinomial} />
      </ThemeProvider>
    </div>
  );
}
