import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
  },
  navbarColumn: {
    flex: '0 0 220px',
  },
  bookNavbar: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[3],
  },
  recipeNavbar: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[2],
  },
  navbarTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },
  scrollBar: {
    height: '100px',
  },
  hideNavbar: {
    display: 'none',
  },
  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

export default useStyles;
