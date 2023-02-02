import { trpc } from '@/utils/trpc';
import { useSelector } from 'react-redux';
import { createStyles, useMantineTheme, ScrollArea } from '@mantine/core';
import { ComponentShelf, BookCard, SelectedBook } from '@/components';
import { selectSelectedBook } from '@/features/dashboard/dashboardSlice';

const useStyles = createStyles((theme) => ({
  gridList: {
    display: 'grid',
    gap: theme.other.remSizing.md,
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 220px))',
    gridTemplateRows: '1fr',
  },
}));
interface IBooksView extends React.PropsWithChildren<any> {
  userId: string;
}

const BooksView: React.FC<IBooksView> = ({ userId }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const books = trpc.useQuery(['user.getUsersBooks', { id: userId }]);

  const selectedBook = useSelector(selectSelectedBook);

  const gridContainer = {
    display: 'grid',
    gridTemplateColumns: `${selectedBook ? '1fr 220px' : '1fr'}`,
    gap: theme.other.remSizing.lg,
  };

  return books.data && books.data.length !== 0 ? (
    <div style={gridContainer}>
      <ComponentShelf title="My Books">
        <ScrollArea style={{ minWidth: '200px' }}>
          <div className={classes.gridList}>
            {books.data.map((book: any) => (
              <BookCard key={book.id} bookId={book.id} title={book.title} />
            ))}
          </div>
        </ScrollArea>
      </ComponentShelf>

      <SelectedBook
        selectedBookData={books.data.find((book) => book.id === selectedBook)}
      />
    </div>
  ) : null;
};

export default BooksView;
