import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    boxSizing: 'border-box',
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.xs,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[4],
  },
  subHeader: {
    height: '35px',
    paddingInline: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[5],
  },
}));

export default useStyles;
