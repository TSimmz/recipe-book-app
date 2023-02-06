import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import {
  Layout,
  Metadata,
  CustomHeader,
  CustomNavbar,
  DisplayRecipe,
  EditRecipe,
} from '@/components';

const Recipe: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const recipeId = id as string;

  const [isEditRecipe, setIsEditRecipe] = useState(false);

  const { data: session } = trpc.useQuery(['auth.getSession']);

  const recipe = trpc.useQuery(['recipe.getRecipeById', { id: recipeId }]);

  return recipe.status === 'success' && recipe.data ? (
    <Layout
      header={<CustomHeader session={session} />}
      navbar={false ? <CustomNavbar userId={session?.id as string} /> : <></>}
      footer={<></>}
    >
      <Metadata title="My Pantry" />
      {!isEditRecipe ? (
        <DisplayRecipe
          recipeData={recipe.data}
          setIsEditRecipe={setIsEditRecipe}
        />
      ) : (
        <EditRecipe
          recipeData={recipe.data}
          setEditRecipeActive={setIsEditRecipe}
        />
      )}
    </Layout>
  ) : null;
};

export default Recipe;
