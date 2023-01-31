import { trpc } from '@/utils/trpc';
import { BookCard } from '@/components';
import {
  useMantineTheme,
  createStyles,
  ScrollArea,
  Group,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: `repeat(${theme.other.grid.columnCount}, minmax(0, 1fr))`,
    gridGap: theme.other.grid.gap,
  },
}));

interface IBooksList extends React.PropsWithChildren<any> {
  userId: string;
}

const BooksList: React.FC<IBooksList> = ({ userId }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const books = trpc.useQuery(['user.getUsersBooks', { id: userId }]);
  const booksList =
    books.status === 'success' && books.data
      ? books.data.map((book: any) => (
          <BookCard key={book.title} title={book.title} />
        ))
      : null;

  return (
    <ScrollArea style={{ minWidth: '100%' }}>
      <Group spacing={theme.other.remSizing.md}>{booksList}</Group>
    </ScrollArea>
  );
};

export default BooksList;
