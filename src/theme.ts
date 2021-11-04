import { createTheme } from '@mui/material/styles';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export const theme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#c82c46',
      },
      secondary: {
        main: '#7A0930',
      },
    },
  });
