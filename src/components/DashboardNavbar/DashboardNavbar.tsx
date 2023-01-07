import { useState } from 'react';
import useStyles from './styles';
import {
  Navbar,
  Modal,
  Title,
  Text,
  ActionIcon,
  ScrollArea,
  Anchor,
  Group,
  Flex,
  useMantineTheme,
} from '@mantine/core';
import { CreateRecipeBook, CreateRecipe, ArrowTooltip } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  selectNavbarOpened,
  selectActiveRecipeBook,
  selectActiveRecipe,
  setActiveRecipeBook,
  setActiveRecipe,
  clearActiveRecipe,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import { trpc } from '@/utils/trpc';
import { IconCirclePlus } from '@tabler/icons';

type DashboardNavbarProps = {
  recipeBooks: any;
  recipeBookMutation: any;
  recipes: any;
  recipeMutation: any;
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  recipeBooks,
  recipeBookMutation,
  recipes,
  recipeMutation,
}: DashboardNavbarProps) => {
  const dispatch = useAppDispatch();

  const navbarOpened = useSelector(selectNavbarOpened);
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);

  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const { data: session } = trpc.useQuery(['auth.getSession']);
  const userId = session?.id as string;

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [recipeBookNavbarOpened, setRecipeBookNavbarOpened] = useState(true);

  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
  const [recipeNavbarOpened, setRecipeNavbarOpened] = useState(true);

  const handleRecipeBookClick = (recipeBookId: string) => {
    if (activeRecipeBook === recipeBookId) return;
    dispatch(setActiveRecipeBook(recipeBookId));
    dispatch(clearActiveRecipe());
  };

  const recipeBooksList =
    recipeBooks.status === 'success'
      ? recipeBooks.data.map((recipeBook: any, index: number) => (
          <Anchor
            component="button"
            type="button"
            className={cx(classes.navLink, classes.recipeBookLinkColor, {
              [classes.recipeBookLinkActiveColor]:
                activeRecipeBook === recipeBook.id,
            })}
            key={recipeBook.title}
            onClick={() => handleRecipeBookClick(recipeBook.id)}
          >
            <Text>{recipeBook.title}</Text>
          </Anchor>
        ))
      : null;

  const handleRecipeClick = (recipeId: string) => {
    if (activeRecipe === recipeId) return;
    dispatch(setActiveRecipe(recipeId));
  };

  const recipesList =
    activeRecipeBook !== '' && recipes.status === 'success'
      ? recipes.data.map((recipe: any, index: number) => (
          <Anchor
            component="button"
            type="button"
            className={cx(classes.navLink, classes.recipeLinkColor, {
              [classes.recipeLinkActiveColor]: activeRecipe === recipe.id,
            })}
            key={recipe.title}
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <Text className={classes.navLinkText}>{recipe.title}</Text>
          </Anchor>
        ))
      : null;

  return (
    <Navbar display="flex" p={0} width={{ base: 440 }}>
      <Navbar.Section grow display="flex">
        <Flex
          className={cx(classes.navbarColumn, classes.bookNavbar)}
          hidden={!recipeBookNavbarOpened}
        >
          <Group className={classes.navbarTitle} position="apart">
            <Title>Books</Title>
            <ArrowTooltip label="Create New Book">
              <ActionIcon
                radius="lg"
                color="dark"
                onClick={() => setOpenCreateRecipeBook(true)}
              >
                <IconCirclePlus />
              </ActionIcon>
            </ArrowTooltip>
          </Group>

          <ScrollArea h={800} w="100%">
            {recipeBooksList}
          </ScrollArea>
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
        </Flex>
        <Flex
          className={cx(classes.navbarColumn, classes.recipeNavbar)}
          hidden={!recipeNavbarOpened}
        >
          {/* <CloseButton onClick={() => setRecipeNavbarOpened(false)} /> */}
          <Group className={classes.navbarTitle} position="apart">
            <Title>Recipes</Title>
            <ArrowTooltip label="Create New Recipe">
              <ActionIcon
                radius="lg"
                color="dark"
                disabled={activeRecipeBook === ''}
                onClick={() => setOpenCreateRecipe(true)}
              >
                <IconCirclePlus />
              </ActionIcon>
            </ArrowTooltip>
          </Group>
          <ScrollArea h={800} w="100%">
            {recipesList}
          </ScrollArea>
          <Modal
            opened={openCreateRecipe}
            onClose={() => setOpenCreateRecipe(false)}
            size="md"
          >
            <CreateRecipe
              recipeBookId={activeRecipeBook}
              setOpenCreateRecipe={setOpenCreateRecipe}
              recipeMutation={recipeMutation}
            />
          </Modal>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
};

export default DashboardNavbar;
