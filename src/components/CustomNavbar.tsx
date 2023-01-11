import { Navbar, Title, Text, Group, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    dislay: 'grid',
    gridTemplateRows: '1fr 1fr',
    border: 'none',
    padding: theme.spacing.lg,
  },
  navbarCard: {
    display: 'grid',
  },
}));

type CustomNavbarProps = {};

const CustomNavbar: React.FC<CustomNavbarProps> = ({}: CustomNavbarProps) => {
  const { classes } = useStyles();
  return (
    <Navbar className={classes.navbar} width={{ base: 340 }}>
      <Navbar.Section className={classes.navbarCard}>
        <Text>Profile Stuff</Text>
      </Navbar.Section>
      <Navbar.Section className={classes.navbarCard}>
        <Text>Edit Profile Stuff</Text>
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
