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
        ? theme.colors.dark[5]
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
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.appOrange[5]
    }`,
  },
  scrollBar: {
    height: '100px',
  },
  navLink: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    width: '100%',
    textAlign: 'left',
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginLeft: theme.spacing.md,
    height: 44,
    lineHeight: '44px',
  },

  recipeBookLinkColor: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      textDecoration: 'none',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.appOrange[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  recipeLinkColor: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      textDecoration: 'none',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.appOrange[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  recipeBookLinkActiveColor: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.appOrange[3],

    '&, &:hover': {
      borderLeftColor: theme.colors.appOrange[2],
      backgroundColor: theme.colors.appOrange[2],
      color: theme.black,
    },
  },

  recipeLinkActiveColor: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.appOrange[0],

    '&, &:hover': {
      borderLeftColor: theme.colors.appOrange[0],
      backgroundColor: theme.colors.appOrange[0],
      color: theme.black,
    },
  },
}));

export default useStyles;
