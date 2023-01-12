import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import {
  Layout,
  Metadata,
  CustomHeader,
  CustomNavbar,
  ShelfDisplay,
} from '@/components';
import { Button } from '@mantine/core';
import { useSelector } from 'react-redux';
import {
  selectActiveRecipeBook,
  selectActiveRecipe,
  clearActiveRecipeBook,
  clearActiveRecipe,
} from '@/features/dashboard/dashboardSlice';
import { useAppDispatch } from '@/features/store';

const MyShelf: NextPage = () => {
  const dispatch = useAppDispatch();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);

  const { data: session } = trpc.useQuery(['auth.getSession']);

  const handleBackClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (activeRecipe) return dispatch(clearActiveRecipe());
    if (!activeRecipe && activeRecipeBook)
      return dispatch(clearActiveRecipeBook());
  };

  return !session ? (
    <div>Please sign in to view this page</div>
  ) : (
    <Layout header={<CustomHeader />} navbar={<CustomNavbar />} footer={<></>}>
      <Metadata title="Recipe Book Dashboard" />
      <Button onClick={handleBackClick}>Back</Button>
      <ShelfDisplay userId={session.id as string} />
    </Layout>
  );
};

export default MyShelf;
