import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { createStyles, useMantineTheme, ScrollArea } from '@mantine/core';
import {
  ComponentShelf,
  CustomButton,
  RecipeCard,
  CreateRecipeModal,
} from '@/components';
import { IconCirclePlus } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  gridList: {
    display: 'grid',
    gap: theme.other.remSizing.md,
    gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
    gridTemplateRows: '1fr',
  },
}));

interface IRecipesView extends React.PropsWithChildren<any> {
  userId: string;
}

const RecipesView: React.FC<IRecipesView> = ({ userId }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const recipes = trpc.useQuery(['user.getUserRecipes', { id: userId }]);

  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  const handleOpenRecipeModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setOpenCreateRecipe(true);
  };

  const recipesToolbar = (
    <>
      <CustomButton
        active
        label="Add New Recipe"
        rightIcon={<IconCirclePlus color={theme.black} />}
        onClick={handleOpenRecipeModal}
      />
      <CreateRecipeModal
        userId={userId}
        modalState={openCreateRecipe}
        closeModal={() => setOpenCreateRecipe(false)}
        fetchRecipes={() => recipes.refetch()}
      />
    </>
  );

  return recipes.status === 'success' && recipes.data ? (
    <ComponentShelf title="My Recipes" toolbar={recipesToolbar}>
      <ScrollArea style={{ minWidth: '100%' }}>
        <div className={classes.gridList}>
          {recipes.data.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipeData={recipe} />
          ))}
        </div>
      </ScrollArea>
    </ComponentShelf>
  ) : null;
};

export default RecipesView;
