import { trpc } from '@/utils/trpc';
import { useSelector } from 'react-redux';
import { createStyles, useMantineTheme } from '@mantine/core';
import { ComponentShelf, BooksList, SelectedBook } from '@/components';
import { selectSelectedBook } from '@/features/dashboard/dashboardSlice';

const useStyles = createStyles((theme) => ({
  gridContainer: {
    display: 'flex',
    gap: theme.other.remSizing.lg,
  },

  hidden: {
    display: 'none',
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

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `${selectedBook ? '1fr 220px' : '1fr'}`,
    gap: theme.other.remSizing.lg,
  };

  return books.data && books.data.length !== 0 ? (
    <div style={gridStyles}>
      <ComponentShelf style={{ flexGrow: 1 }} title="My Books">
        <BooksList userId={userId} booksData={books.data} />
      </ComponentShelf>

      <SelectedBook
        selectedBookData={books.data.find((book) => book.id === selectedBook)}
      />
    </div>
  ) : null;
};

export default BooksView;
