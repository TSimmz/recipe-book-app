import { trpc } from '@/utils/trpc';
import {
  selectActiveRecipeBook,
  selectActiveRecipe,
  selectSelectedRecipeBook,
  selectSelectedRecipe,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import {
  CardsContainer,
  CustomLoader,
  DisplayRecipe,
  RecipeBookCard,
  RecipeCard,
} from '@/components';

type ShelfDisplayProps = {
  userId: string;
};

const ShelfDisplay: React.FC<ShelfDisplayProps> = ({
  userId,
}: ShelfDisplayProps) => {
  // Shelf state stored in redux for page changes.
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);
  const selectedRecipeBook = useSelector(selectSelectedRecipeBook);
  const selectedRecipe = useSelector(selectSelectedRecipe);

  // Get data from DB
  const user = trpc.useQuery(['user.getUserById', { id: userId }]);

  const recipeBooks = trpc.useQuery([
    'user.getUsersRecipeBooks',
    { id: userId },
  ]);

  const recipes = trpc.useQuery([
    'recipebook.getAllRecipesInBook',
    { id: activeRecipeBook },
  ]);

  // Map data from DB
  const recipeBooksCards =
    recipeBooks.status === 'success' && recipeBooks.data
      ? recipeBooks?.data.map((recipeBook: any) => (
          <RecipeBookCard
            key={recipeBook.id}
            bookId={recipeBook.id}
            active={recipeBook.id === selectedRecipeBook}
            recipeBook={recipeBook}
          />
        ))
      : null;

  const recipeCards =
    recipes.status === 'success' && recipes.data
      ? recipes?.data.map((recipe: any) => (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            active={recipe.id === selectedRecipe}
            recipe={recipe}
          />
        ))
      : null;

  // If any data is loading, display loader
  if (
    user.status === 'loading' ||
    recipeBooks.status === 'loading' ||
    recipes.status === 'loading'
  ) {
    return <CustomLoader />;
  }

  // If selected recipe is opened, show recipe display
  if (activeRecipe !== '') {
    return <DisplayRecipe />;
  }

  // If selected book is opened, show cards container with that book's recipes
  if (activeRecipeBook !== '' && recipeBooks.data) {
    const activeRecipeBookTitle = recipeBooks?.data.find(
      (book) => book.id === activeRecipeBook,
    )?.title;
    return (
      <CardsContainer title={`${activeRecipeBookTitle}`} cards={recipeCards} />
    );
  }

  // If nothing selected, show cards container with user's books
  return (
    <CardsContainer
      title={`${user.data?.name}'s Books`}
      cards={recipeBooksCards}
    />
  );
};

export default ShelfDisplay;
