import {
  Navbar,
  createStyles,
  useMantineTheme,
  ScrollArea,
} from '@mantine/core';
import {
  RecipeBookDisplayCard,
  RecipeDisplayCard,
  UserCard,
} from '@/components';

const useStyles = createStyles((theme) => ({
  navbar: {
    border: 'none',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingLeft: theme.spacing.lg,
  },
  navbarCard: {
    marginBottom: theme.spacing.lg,
  },
}));

type CustomNavbarProps = {};

const CustomNavbar: React.FC<CustomNavbarProps> = ({}: CustomNavbarProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <Navbar className={classes.navbar} width={{ base: 350 }}>
      <ScrollArea.Autosize maxHeight={'90vh'} offsetScrollbars>
        <Navbar.Section mb={theme.spacing.lg} className={classes.navbarCard}>
          <UserCard />
        </Navbar.Section>
        <Navbar.Section className={classes.navbarCard}>
          <RecipeDisplayCard />
        </Navbar.Section>
        <Navbar.Section className={classes.navbarCard}>
          <RecipeBookDisplayCard />
        </Navbar.Section>
      </ScrollArea.Autosize>
    </Navbar>
  );
};

export default CustomNavbar;
