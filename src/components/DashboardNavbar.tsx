import { useState } from 'react';
import {
  createStyles,
  Navbar,
  Modal,
  Button,
  Burger,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core';
import { CreateRecipeBook, CreateRecipe } from '@/components';

import { trpc } from '@/utils/trpc';

type DashboardNavbarProps = {
  opened: boolean;
  setOpened: any;
  recipeBookMutation: any;
};

const useStyles = createStyles((theme) => ({
  navbar: {},
  navbarColumn: {},
  navbarTitle: {},
}));

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  opened,
  setOpened,
  recipeBookMutation,
}: DashboardNavbarProps) => {
  const { data: session } = trpc.useQuery(['auth.getSession']);
  const userId = session?.id as string;

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [recipeBookNavbarOpened, setRecipeBookNavbarOpened] = useState(true);

  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);
  const [recipeNavbarOpened, setRecipeNavbarOpened] = useState(true);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        This page is secret!
        <div style={{ margin: '1rem' }}>
          <Button
            color="yellow"
            radius="md"
            size="md"
            onClick={() => setOpenCreateRecipeBook(true)}
          >
            Create Recipe Book
          </Button>
        </div>
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
        <div style={{ margin: '1rem' }}>
          <Button
            color="yellow"
            radius="md"
            size="md"
            onClick={() => setOpenCreateRecipe(true)}
          >
            Create Recipe
          </Button>
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
    </Navbar>
  );
};

export default DashboardNavbar;
