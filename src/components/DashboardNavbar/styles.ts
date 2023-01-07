import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbarColumn: {
    flex: '0 0 220px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0px 10px 10px',

    h1: {
      fontSize: 18,
      fontWeight: 'normal',
      fontFamily: theme.fontFamily,
    },
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
    boxSizing: 'border-box',
    marginBottom: 10,
    marginRight: 14,
    marginLeft: 7,
    padding: '14px 0 8px 7px',
    height: 50,
    borderBottom: `2px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.black
    }`,
  },

  navLink: {
    width: '100%',
    maxWidth: '210px',
    display: 'block',
    boxSizing: 'border-box',
    textDecoration: 'none',
    textAlign: 'left',
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
    padding: '6px 10px',
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: theme.fontFamily,
    marginBottom: '4px',
    height: 44,
    lineHeight: '44px',

    ' > div': {
      display: 'block',
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },

  navLinkText: {},

  recipeBookLinkColor: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      textDecoration: 'none',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.appOrange[2],
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
