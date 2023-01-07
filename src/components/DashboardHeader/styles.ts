import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    boxSizing: 'border-box',
  },
  mainHeader: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[4],
  },
  subHeader: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[5],
  },
}));

export default useStyles;
