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

type CustomNavbarProps = {
  userId: string;
};

const CustomNavbar: React.FC<CustomNavbarProps> = ({
  userId,
}: CustomNavbarProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <Navbar className={classes.navbar} width={{ base: 350 }}>
      <ScrollArea.Autosize maxHeight={'90vh'} offsetScrollbars>
        <div style={{ paddingRight: theme.spacing.sm }}>
          <Navbar.Section mb={theme.spacing.lg} className={classes.navbarCard}>
            <UserCard userId={userId} />
          </Navbar.Section>
          <Navbar.Section className={classes.navbarCard}>
            <RecipeDisplayCard />
          </Navbar.Section>
          <Navbar.Section className={classes.navbarCard}>
            <RecipeBookDisplayCard />
          </Navbar.Section>
        </div>
      </ScrollArea.Autosize>
    </Navbar>
  );
};

export default CustomNavbar;
