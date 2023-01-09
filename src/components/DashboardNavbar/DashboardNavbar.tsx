import { useState } from 'react';
import useStyles from './styles';
import {
  Navbar,
  Modal,
  Title,
  Text,
  ScrollArea,
  Anchor,
  Group,
  Flex,
} from '@mantine/core';
import { CreateRecipeBook, CreateRecipe, IconButton } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  selectActiveRecipeBook,
  selectActiveRecipe,
  setActiveRecipeBook,
  setActiveRecipe,
  clearActiveRecipe,
  selectNavbarWidth,
  setNavbarWidth,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import { trpc } from '@/utils/trpc';
import { IconCirclePlus, IconX } from '@tabler/icons';

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

  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);
  const navbarWidth = useSelector(selectNavbarWidth);

  const { classes, cx } = useStyles();

  const { data: session } = trpc.useQuery(['auth.getSession']);
  const userId = session?.id as string;

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  const [recipeNavbarOpened, setRecipeNavbarOpened] = useState(true);

  const handleRecipeBookClick = (recipeBookId: string) => {
    if (recipeNavbarOpened === false) {
      if (activeRecipe !== recipeBookId) {
        dispatch(setActiveRecipeBook(recipeBookId));
        dispatch(clearActiveRecipe());
      }

      setRecipeNavbarOpened(true);
      dispatch(setNavbarWidth(440));
      return;
    }

    if (activeRecipeBook === recipeBookId) return;

    dispatch(setActiveRecipeBook(recipeBookId));
    dispatch(clearActiveRecipe());
  };

  const recipeBooksList =
    recipeBooks.status === 'success'
      ? recipeBooks.data.map((recipeBook: any) => (
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
      ? recipes.data.map((recipe: any) => (
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
    <Navbar display="flex" p={0} width={{ base: navbarWidth }}>
      <Navbar.Section grow display="flex">
        <Flex className={cx(classes.navbarColumn, classes.bookNavbar)}>
          <Group className={classes.navbarTitle} position="apart">
            <Group>
              <Title mr={-10}>Books</Title>
              <IconButton
                label="Create New Book"
                tooltipPosition="top"
                icon={<IconCirclePlus />}
                handleClick={() => setOpenCreateRecipeBook(true)}
              />
            </Group>
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
          <Group mr={10} style={{ alignSelf: 'flex-end' }}></Group>
          <Group className={classes.navbarTitle} position="apart">
            <Group>
              <Title mr={-10}>Recipes</Title>
              <IconButton
                label="Create New Recipe"
                tooltipPosition="top"
                disabled={activeRecipeBook === ''}
                icon={<IconCirclePlus />}
                handleClick={() => setOpenCreateRecipe(true)}
              />
            </Group>
            <IconButton
              label="Close Recipes"
              tooltipPosition="top"
              icon={<IconX size={16} />}
              handleClick={() => {
                setRecipeNavbarOpened(false);
                dispatch(setNavbarWidth(220));
              }}
            />
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
