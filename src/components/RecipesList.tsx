import { BookCard } from '@/components';
import { ScrollArea, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  gridContainer: {
    display: 'grid',
    gap: theme.other.remSizing.md,
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 220px))',
    gridTemplateRows: '1fr',
  },
}));

interface IReviewsList extends React.PropsWithChildren<any> {
  booksData: any;
}

const RecipesList: React.FC<IReviewsList> = ({ booksData }) => {
  const { classes } = useStyles();

  const booksList = booksData.map((book: any) => (
    <BookCard key={book.id} bookId={book.id} title={book.title} />
  ));

  return (
    <ScrollArea style={{ minWidth: '200px' }}>
      <div className={classes.gridContainer}>{booksList}</div>
    </ScrollArea>
  );
};

export default RecipesList;
