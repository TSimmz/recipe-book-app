import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Layout, Metadata } from '@/components';
import { trpc } from '@/utils/trpc';
import {
  Container,
  Flex,
  Navbar,
  Modal,
  Header,
  MediaQuery,
  Burger,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import CreateRecipeBook from '@/components/CreateRecipeBook';
import CreateRecipe from '@/components/CreateRecipe';

const Dashboard: NextPage = () => {
  const theme = useMantineTheme();
  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  const [headerOpened, setHeaderOpened] = useState(false);
  const [navbarOpened, setNavbarOpened] = useState(false);

  const { data: session } = trpc.useQuery(['auth.getSession'], {
    refetchInterval: 500,
    refetchIntervalInBackground: true,
  });
  const userId = session?.id as string;

  const recipeBooks = trpc.useQuery([
    'user.getUsersRecipeBooks',
    { id: session?.id as string },
  ]);

  const recipeBookMutation = trpc.useMutation(['recipebook.createRecipeBook'], {
    onSuccess: () => {
      recipeBooks.refetch();
    },
  });

  const renderDashboardHeader = () => {
    return (
      <Header height={70} p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={headerOpened}
              onClick={() => setHeaderOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Container style={{ width: '100%', padding: '1rem', margin: '0' }}>
            <Flex justify="flex-end">
              <Button
                onClick={() => {
                  signOut();
                }}
                color="yellow"
                radius="md"
                size="md"
              >
                {' '}
                Sign Out
              </Button>
            </Flex>
          </Container>
        </div>
      </Header>
    );
  };

  const renderDashboardNavbar = () => {
    return (
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!navbarOpened}
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
          {!openCreateRecipe && (
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
          )}
          {openCreateRecipe && (
            <CreateRecipe
              recipeBookId={'recipeBookId'}
              setOpenCreateRecipe={setOpenCreateRecipe}
            />
          )}
        </div>
      </Navbar>
    );
  };

  return !session ? (
    <div className={styles.container}>Please sign in to view this page</div>
  ) : (
    <Layout header={renderDashboardHeader()} navbar={renderDashboardNavbar()}>
      <div className={styles.container}>
        <Metadata title="Recipe Book Dashboard" />
        <main className={styles.main}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recipeBooks.status === 'success' && (
              <>
                {recipeBooks.data.map((recipeBook) => {
                  return (
                    <div key={recipeBook.title}>
                      <h2>{recipeBook.title}</h2>
                      <h4>{recipeBook.description}</h4>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
