import { useState } from 'react';
import useStyles from './styles';
import { Navbar, Modal, Title, ActionIcon, ScrollArea } from '@mantine/core';
import { CreateRecipeBook, CreateRecipe, ArrowTooltip } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  selectNavbarOpened,
  selectActiveRecipeBook,
  selectActiveRecipe,
  setActiveRecipeBook,
  setActiveRecipe,
  clearActiveRecipeBook,
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
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeRecipeBook === recipeBook.id,
            })}
            href={`#`}
            key={recipeBook.title}
            onClick={() => handleRecipeBookClick(recipeBook.id)}
          >
            <Title order={5}>{recipeBook.title}</Title>
          </a>
        ))
      : null;

  const handleRecipeClick = (recipeId: string) => {
    if (activeRecipe === recipeId) return;
    dispatch(setActiveRecipe(recipeId));
  };

  const recipesList =
    activeRecipeBook !== '' && recipes.status === 'success'
      ? recipes.data.map((recipe: any, index: number) => (
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeRecipe === recipe.id,
            })}
            href={`#`}
            key={recipe.title}
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <Title order={5}>{recipe.title}</Title>
          </a>
        ))
      : null;

  return (
    <Navbar
      className={cx(classes.navbar, {
        [classes.hideNavbar]: navbarOpened === false,
      })}
      width={{ lg: 440 }}
    >
      <Navbar.Section grow className={classes.navbar}>
        <div
          className={cx(classes.navbarColumn, classes.bookNavbar)}
          hidden={!recipeBookNavbarOpened}
        >
          {/* <CloseButton onClick={() => setRecipeBookNavbarOpened(false)} /> */}
          <div className={classes.navbarTitle}>
            <Title order={5}>Books</Title>
            <ArrowTooltip label="Create New Book">
              <ActionIcon
                radius="lg"
                color="dark"
                onClick={() => setOpenCreateRecipeBook(true)}
              >
                <IconCirclePlus />
              </ActionIcon>
            </ArrowTooltip>
          </div>
          <ScrollArea.Autosize
            maxHeight={600}
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
          {/* <CloseButton onClick={() => setRecipeNavbarOpened(false)} /> */}
          <div className={cx(classes.navbarTitle)}>
            <Title order={5}>Recipes</Title>
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
          </div>
          <ScrollArea.Autosize
            maxHeight={600}
            classNames={{
              scrollbar: classes.scrollBar,
            }}
          >
            {recipesList}
          </ScrollArea.Autosize>
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
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default DashboardNavbar;
