import { useState } from 'react';
import useStyles from './styles';
import { Navbar, Modal, Title, ActionIcon, ScrollArea } from '@mantine/core';
import { CreateRecipeBook, CreateRecipe, ArrowTooltip } from '@/components';

import { trpc } from '@/utils/trpc';
import { IconCirclePlus } from '@tabler/icons';

type DashboardNavbarProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  recipeBooks: any;
  recipeBookMutation: any;
  recipes: any;
  recipeMutation: any;
  activeRecipeBook: string;
  setActiveRecipeBook: React.Dispatch<React.SetStateAction<string>>;
  activeRecipe: string;
  setActiveRecipe: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  opened,
  setOpened,
  recipeBooks,
  recipeBookMutation,
  recipes,
  recipeMutation,
  activeRecipeBook,
  setActiveRecipeBook,
  activeRecipe,
  setActiveRecipe,
}: DashboardNavbarProps) => {
  const { classes, cx } = useStyles();

  const { data: session } = trpc.useQuery(['auth.getSession']);
  const userId = session?.id as string;

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [recipeBookNavbarOpened, setRecipeBookNavbarOpened] = useState(true);

  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
  const [recipeNavbarOpened, setRecipeNavbarOpened] = useState(true);

  const recipeBooksList =
    recipeBooks.status === 'success'
      ? recipeBooks.data.map((recipeBook: any, index: number) => (
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeRecipeBook === recipeBook.id,
            })}
            href={`#`}
            key={recipeBook.title}
            onClick={() => {
              setActiveRecipeBook(recipeBook.id);
              setActiveRecipe('');
              return;
            }}
          >
            <Title order={5}>{recipeBook.title}</Title>
          </a>
        ))
      : null;

  const recipesList =
    activeRecipeBook !== '' && recipes.status === 'success'
      ? recipes.data.map((recipe: any, index: number) => (
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeRecipe === recipe.id,
            })}
            href={`#`}
            key={recipe.title}
            onClick={() => setActiveRecipe(recipe.id)}
          >
            <Title order={5}>{recipe.title}</Title>
          </a>
        ))
      : null;

  return (
    <Navbar
      className={cx(classes.navbar, { [classes.hideNavbar]: opened === false })}
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
