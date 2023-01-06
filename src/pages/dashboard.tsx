import type { NextPage } from 'next';
import {
  DisplayRecipe,
  Layout,
  Metadata,
  DashboardHeader,
  DashboardNavbar,
} from '@/components';
import { Text } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import useStyles from '@/styles/dashboardStyles';
import {
  selectActiveRecipe,
  selectActiveRecipeBook,
  selectNavbarOpened,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';

const Dashboard: NextPage = () => {
  const navbarOpened = useSelector(selectNavbarOpened);
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);

  const { classes } = useStyles();

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

  const recipes = trpc.useQuery([
    'recipebook.getAllRecipesInBook',
    { id: activeRecipeBook },
  ]);

  const recipeMutation = trpc.useMutation(['recipe.createRecipe'], {
    onSuccess: () => {
      recipes.refetch();
    },
  });

  const renderDashboardHeader: () => JSX.Element = () => {
    return <DashboardHeader />;
  };

  const renderDashboardNavbar: () => JSX.Element = () => {
    return navbarOpened ? (
      <DashboardNavbar
        recipeBooks={recipeBooks}
        recipeBookMutation={recipeBookMutation}
        recipes={recipes}
        recipeMutation={recipeMutation}
      />
    ) : (
      <></>
    );
  };

  return !session ? (
    <div>Please sign in to view this page</div>
  ) : (
    <Layout
      header={renderDashboardHeader()}
      navbar={renderDashboardNavbar()}
      footer={<></>}
    >
      <Metadata title="Recipe Book Dashboard" />
      <div className={classes.main}>
        {activeRecipe ? <DisplayRecipe /> : <Text>EMPTY PAGE</Text>}
      </div>
    </Layout>
  );
};

export default Dashboard;
