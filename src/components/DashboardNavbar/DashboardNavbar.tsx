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
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  opened,
  setOpened,
  recipeBooks,
  recipeBookMutation,
}: DashboardNavbarProps) => {
  const { classes, cx } = useStyles();

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
            href={`#`}
            key={recipeBook.title}
          >
            <Title order={5}>{recipeBook.title}</Title>
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
                onClick={() => setOpenCreateRecipe(true)}
              >
                <IconCirclePlus />
              </ActionIcon>
            </ArrowTooltip>
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
