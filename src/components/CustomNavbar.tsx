import { Navbar, Text, createStyles, useMantineTheme } from '@mantine/core';
import { RecipeBookCard, UserCard } from '@/components';

const useStyles = createStyles((theme) => ({
  navbar: {
    border: 'none',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingLeft: theme.spacing.lg,
  },
  navbarCard: {},
}));

type CustomNavbarProps = {};

const CustomNavbar: React.FC<CustomNavbarProps> = ({}: CustomNavbarProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <Navbar className={classes.navbar} width={{ base: 340 }}>
      <Navbar.Section mb={theme.spacing.lg} className={classes.navbarCard}>
        <UserCard />
      </Navbar.Section>
      <Navbar.Section className={classes.navbarCard}>
        <Text>STUFF GOES HERE</Text>
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavbar;
