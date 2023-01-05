import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Layout, Metadata } from '@/components';
import { trpc } from '@/utils/trpc';
import useStyles from '@/styles/dashboardStyles';
import { DashboardHeader, DashboardNavbar } from '@/components';

const Dashboard: NextPage = () => {
  const { classes } = useStyles();

  const [navbarOpened, setNavbarOpened] = useState(false);

  const { data: session } = trpc.useQuery(['auth.getSession']);

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
    <Layout
      header={renderDashboardHeader()}
      navbar={renderDashboardNavbar()}
      footer={<></>}
    >
      <div className={classes.container}>
        <Metadata title="Recipe Book Dashboard" />
        <main className={classes.main}>EMPTY PAGE</main>
      </div>
    </Layout>
  );
};

export default Dashboard;
