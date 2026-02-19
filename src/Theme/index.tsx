import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { colors, spacing, radii } from './tokens';

export const theme = { colors, spacing, radii };

export const AppThemeProvider: React.FC<any> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
