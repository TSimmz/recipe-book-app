import type { NextPage } from 'next';
import { Layout, Metadata } from '@/components';
import { trpc } from '@/utils/trpc';
import useStyles from '@/styles/dashboardStyles';
import { DashboardHeader, DashboardNavbar } from '@/components';
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

  const renderDashboardHeader = () => {
    return <DashboardHeader />;
  };

  const renderDashboardNavbar = () => {
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
