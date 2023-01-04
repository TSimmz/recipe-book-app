import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Layout, Metadata } from '@/components';
import { trpc } from '@/utils/trpc';
import {
  Container,
  Flex,
  Header,
  Burger,
  Button,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { signOut } from 'next-auth/react';
import { DashboardHeader, DashboardNavbar } from '@/components';

const useStyles = createStyles((theme) => ({
  container: {
    padding: '0 2rem',
  },
  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: '1',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Dashboard: NextPage = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [navbarOpened, setNavbarOpened] = useState(false);

  const { data: session } = trpc.useQuery(['auth.getSession'], {
    // refetchInterval: 500,
    // refetchIntervalInBackground: true,
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
      <DashboardHeader
        navbarOpened={navbarOpened}
        setNavbarOpened={setNavbarOpened}
      />
    );
  };

  const renderDashboardNavbar = () => {
    return (
      <DashboardNavbar
        opened={navbarOpened}
        setOpened={setNavbarOpened}
        recipeBooks={recipeBooks}
        recipeBookMutation={recipeBookMutation}
      />
    );
  };

  return !session ? (
    <div className={classes.container}>Please sign in to view this page</div>
  ) : (
    <Layout header={renderDashboardHeader()} navbar={renderDashboardNavbar()}>
      <div className={classes.container}>
        <Metadata title="Recipe Book Dashboard" />
        <main className={classes.main}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            EMPTY PAGE
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
