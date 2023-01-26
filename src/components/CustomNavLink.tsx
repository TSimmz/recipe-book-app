import Link from 'next/link';
import { Button, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navLink: {
    position: 'relative',
  },
  navLinkButton: {
    fontFamily: theme.fontFamily,
    fontWeight: 'normal',
    fontSize: '16px',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: '22px',
    padding: `2px ${theme.spacing.md} `,
    cursor: 'pointer',
    color: theme.white,
    backgroundColor: theme.colors.dark[4],
    position: 'relative',
    transition: 'all ease-in-out 250ms',

    '&:hover': {
      backgroundColor: theme.colors.dark[3],
      transform: 'scale(1.05)',
      transition: 'all ease-in-out 250ms',
    },

    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   display: 'block',

    //   borderRadius: '32px',
    //   inset: 0,
    //   zIndex: -1,
    //   backgroundColor: theme.colors.dark[3],
    //   transform: 'scale(0)',
    //   transition: 'all ease-in-out 250ms',
    // },

    // '&:hover::before': {
    //   transform: 'scale(1)',
    // },
  },

  navLinkButtonActive: {
    color: theme.black,
    backgroundColor: theme.colors.orange[3],

    '&:hover': {
      backgroundColor: theme.colors.orange[5],
      transform: 'scale(1.05)',
      transition: 'all ease-in-out 250ms',
    },

    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   display: 'block',

    //   borderRadius: '32px',
    //   inset: 0,
    //   zIndex: -1,
    //   backgroundColor: theme.colors.orange[5],
    //   transform: 'scale(0)',
    //   transition: 'all ease-in-out 250ms',
    // },

    // '&:hover::before': {
    //   transform: 'scale(1)',
    // },
  },
}));

interface ICustomNavLink extends React.PropsWithChildren<any> {
  label: string;
  linkTo: string;
}

const CustomNavLink: React.FC<ICustomNavLink> = ({
  label,
  linkTo,
  active,
  disabled,
}) => {
  const { classes, cx } = useStyles();

  return (
    <Link className={classes.navLink} href={linkTo}>
      <Button
        radius="xl"
        disabled={disabled}
        className={cx(classes.navLinkButton, {
          [classes.navLinkButtonActive]: active === true,
        })}
      >
        {label}
      </Button>
    </Link>
  );
};

export default CustomNavLink;
