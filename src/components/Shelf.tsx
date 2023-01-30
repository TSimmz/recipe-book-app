import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import {
  selectActiveBook,
  selectActiveRecipe,
  selectSelectedBook,
  selectSelectedRecipe,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import {
  CardsContainer,
  CustomLoader,
  DisplayRecipe,
  BookCard,
  RecipeCard,
  EditRecipe,
} from '@/components';

interface IShelf extends React.PropsWithChildren<any> {
  userId: string;
}

const Shelf: React.FC<IShelf> = ({ userId }) => {
  // Shelf state stored in redux for page changes.
  const activeBook = useSelector(selectActiveBook);
  const activeRecipe = useSelector(selectActiveRecipe);
  const selectedBook = useSelector(selectSelectedBook);
  const selectedRecipe = useSelector(selectSelectedRecipe);

  const [editRecipeActive, setEditRecipeActive] = useState(false);

  // Get data from DB
  const user = trpc.useQuery(['user.getUserById', { id: userId }]);

  const books = trpc.useQuery(['user.getUsersBooks', { id: userId }]);

  const recipes = trpc.useQuery([
    'book.getAllRecipesInBook',
    { id: activeBook },
  ]);

  // Map data from DB
  const booksCards =
    books.status === 'success' && books.data
      ? books?.data.map((book: any) => (
          <BookCard
            key={book.id}
            bookId={book.id}
            active={book.id === selectedBook}
            book={book}
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

  const toggleEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setEditRecipeActive((editRecipeActive) => !editRecipeActive);
  };

  // If any data is loading, display loader
  if (
    user.status === 'loading' ||
    books.status === 'loading' ||
    recipes.status === 'loading'
  ) {
    return <CustomLoader />;
  }

  if (activeRecipe !== '') {
    // If selected recipe is opened, show recipe display
    if (editRecipeActive) {
      const recipeData =
        recipes.data &&
        recipes.data.find((recipe: any) => recipe.id === activeRecipe);
      return (
        <EditRecipe
          recipeId={activeRecipe}
          recipeData={recipeData}
          editRecipeActive={editRecipeActive}
          setEditRecipeActive={setEditRecipeActive}
        />
      );
    }

    return (
      <DisplayRecipe
        editRecipeActive={editRecipeActive}
        setEditRecipeActive={setEditRecipeActive}
      />
    );
  }

  // If selected book is opened, show cards container with that book's recipes
  if (activeBook !== '' && books.data) {
    const activeBookTitle = books?.data.find(
      (book: any) => book.id === activeBook,
    )?.title;
    return <CardsContainer title={`${activeBookTitle}`} cards={recipeCards} />;
  }

  // If nothing selected, show cards container with user's books
  return (
    <CardsContainer title={`${user.data?.name}'s Books`} cards={booksCards} />
  );
};

export default Shelf;
