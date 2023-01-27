import { MantineThemeOverride } from '@mantine/core';

const appTheme: MantineThemeOverride = {
  colorScheme: 'dark',
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
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  components: {
    Title: {
      styles: (theme) => ({
        root: {
          fontFamily: theme.fontFamily,
          fontWeight: 'normal',
        },
      }),
    },
    TextInput: {
      styles: (theme) => ({
        input: {
          '&:focus-visible': {
            borderColor: theme.colors.orange[3],
          },
        },
        label: {
          marginBottom: theme.spacing.xs,
        },
        required: {
          color: theme.colors.orange[3],
        },
      }),
    },
    Textarea: {
      styles: (theme) => ({
        input: {
          '&:focus-visible': {
            borderColor: theme.colors.orange[3],
          },
        },
        label: {
          marginBottom: theme.spacing.xs,
        },
        required: {
          color: theme.colors.orange[3],
        },
      }),
    },
    NumberInput: {
      styles: (theme) => ({
        input: {
          '&:focus-visible': {
            borderColor: theme.colors.orange[3],
          },
        },
        label: {
          marginBottom: theme.spacing.xs,
        },
        required: {
          color: theme.colors.orange[3],
        },
      }),
    },
  },
};

export default appTheme;
