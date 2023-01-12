import { trpc } from '@/utils/trpc';
import { useAppDispatch } from '@/features/store';
import {
  selectActiveRecipeBook,
  selectActiveRecipe,
  setActiveRecipeBook,
  setActiveRecipe,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import CardsContainer from './CardsContainer';
import RecipeBookCard from './RecipeBookCard';

type ShelfDisplayProps = {
  userId: string;
};

const ShelfDisplay: React.FC<ShelfDisplayProps> = ({
  userId,
}: ShelfDisplayProps) => {
  // Shelf state stored in redux for page changes.
  const dispatch = useAppDispatch();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);

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
            active={recipeBook.id === activeRecipeBook}
            recipeBook={recipeBook}
          />
        ))
      : null;

  // If nothing selected, show cards container with user's books

  // If book selected, show cards container with user's books, with selected book card above

  // If selected book is opened, show cards container with that book's recipes

  // If recipe selected, show cards container with book's recipes with selected recipe card above

  // If selected recipe is opened, show recipe display

  return (
    <CardsContainer
      title={`${user.data?.name}'s Books`}
      cards={recipeBooksCards}
    />
  );
};

export default ShelfDisplay;
