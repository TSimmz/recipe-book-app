import { MantineThemeOverride } from '@mantine/core';

const appTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  other: {
    remSizing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '2.5rem',
      xxxl: '3rem',
    },
    minShelfHeight: '300px',
    grid: {
      gap: '1.5rem',
    },
  },
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
