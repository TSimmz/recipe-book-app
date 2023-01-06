import { MantineThemeOverride } from '@mantine/core';

const appTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    appOrange: [
      '#FEF9F2', // Base background
      '#FAEAD2',
      '#FFD9A0', // Recipe Navbar
      '#FFCB7D', // Recipebook Navbar
      '#FFC163', // Main Header
      '#FEB344', // Sub-header
      '#C3811F',
      '#A06E21',
      '#845D22',
      '#6E4F22',
    ],
  },
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
};

export default appTheme;
