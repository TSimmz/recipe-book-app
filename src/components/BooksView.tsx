import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { useSelector } from 'react-redux';
import { createStyles, useMantineTheme, ScrollArea } from '@mantine/core';
import {
  ComponentShelf,
  BookCard,
  SelectedBook,
  CustomButton,
  CreateBookModal,
} from '@/components';
import { selectSelectedBook } from '@/features/dashboard/dashboardSlice';

import { IconCirclePlus } from '@tabler/icons';

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
  const books = trpc.useQuery(['user.getUserBooks', { id: userId }]);

  const selectedBook = useSelector(selectSelectedBook);

  const [openCreateBook, setOpenCreateBook] = useState(false);

  const handleOpenBookModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setOpenCreateBook(true);
  };

  const gridContainer = {
    display: 'grid',
    gridTemplateColumns: `${selectedBook ? '1fr 220px' : '1fr'}`,
    gap: theme.other.remSizing.lg,
  };

  const booksToolBar = (
    <>
      <CustomButton
        active
        label="Add New Book"
        rightIcon={<IconCirclePlus color={theme.black} />}
        onClick={handleOpenBookModal}
      />
      <CreateBookModal
        userId={userId}
        modalState={openCreateBook}
        closeModal={() => setOpenCreateBook(false)}
        fetchBooks={() => books.refetch()}
      />
    </>
  );

  return books.data && books.data.length !== 0 ? (
    <div style={gridContainer}>
      <ComponentShelf title="My Books" toolbar={booksToolBar}>
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
