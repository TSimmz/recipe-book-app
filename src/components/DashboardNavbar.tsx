import { useState } from 'react';
import {
  createStyles,
  Navbar,
  Modal,
  Button,
  Title,
  Burger,
  MediaQuery,
  Tooltip,
  useMantineTheme,
  ActionIcon,
  ScrollArea,
} from '@mantine/core';
import { CreateRecipeBook, CreateRecipe } from '@/components';

import { trpc } from '@/utils/trpc';
import { IconCirclePlus } from '@tabler/icons';

type DashboardNavbarProps = {
  opened: boolean;
  setOpened: any;
  recipeBooks: any;
  recipeBookMutation: any;
};

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

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  opened,
  setOpened,
  recipeBooks,
  recipeBookMutation,
}: DashboardNavbarProps) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  console.log('THEME: ', theme);

  const { data: session } = trpc.useQuery(['auth.getSession']);
  const userId = session?.id as string;

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [recipeBookNavbarOpened, setRecipeBookNavbarOpened] = useState(true);

  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
  const [recipeNavbarOpened, setRecipeNavbarOpened] = useState(true);

  const [activeRecipeBook, setActiveRecipeBook] = useState('Settings');

  const recipeBooksList =
    recipeBooks.status === 'success'
      ? recipeBooks.data.map((recipeBook: any, index: number) => (
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeRecipeBook === recipeBook.title,
            })}
            href={`/${recipeBook.id}`}
            key={recipeBook.title}
          >
            <Title order={5}>{recipeBook.title}</Title>
          </a>
        ))
      : null;

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ lg: 440 }}>
      <Navbar.Section grow className={classes.navbar}>
        <div
          className={cx(classes.navbarColumn, classes.bookNavbar)}
          hidden={!recipeBookNavbarOpened}
        >
          <div className={classes.navbarTitle}>
            <Title order={5}>Books</Title>
            <Tooltip
              label="Create New Book"
              withArrow
              transition="fade"
              transitionDuration={250}
            >
              <ActionIcon
                radius="lg"
                color="dark"
                onClick={() => setOpenCreateRecipeBook(true)}
              >
                <IconCirclePlus />
              </ActionIcon>
            </Tooltip>
          </div>
          <ScrollArea.Autosize
            maxHeight={1200}
            classNames={{
              scrollbar: classes.scrollBar,
            }}
          >
            {recipeBooksList}
          </ScrollArea.Autosize>
          <Modal
            opened={openCreateRecipeBook}
            onClose={() => setOpenCreateRecipeBook(false)}
            size="md"
          >
            <CreateRecipeBook
              userId={userId}
              setOpenCreateRecipeBook={setOpenCreateRecipeBook}
              recipeBookMutation={recipeBookMutation}
            />
          </Modal>
        </div>
        <div
          className={cx(classes.navbarColumn, classes.recipeNavbar)}
          hidden={!recipeNavbarOpened}
        >
          <div className={classes.navbarTitle}>
            <Title order={5}>Recipes</Title>
            <Tooltip
              label="Create New Recipe"
              withArrow
              transition="fade"
              transitionDuration={250}
            >
              <ActionIcon
                radius="lg"
                color="dark"
                onClick={() => setOpenCreateRecipe(true)}
              >
                <IconCirclePlus />
              </ActionIcon>
            </Tooltip>
          </div>

          <Modal
            opened={openCreateRecipe}
            onClose={() => setOpenCreateRecipe(false)}
            size="md"
          >
            <CreateRecipe
              recipeBookId={'recipeBookId'}
              setOpenCreateRecipe={setOpenCreateRecipe}
            />
          </Modal>
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default DashboardNavbar;
