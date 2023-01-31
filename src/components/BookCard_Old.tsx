import { useState } from 'react';
import {
  Stack,
  Title,
  Text,
  Image,
  Group,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import {
  CustomCard,
  IconButton,
  EditBookModal,
  DeleteBookModal,
} from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  setSelectedBook,
  setSelectAndActiveBook,
} from '@/features/dashboard/dashboardSlice';
import { IconTrash, IconEdit, IconArrowUpRightCircle } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  image: {
    position: 'relative',

    '&::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      inset: 0,
      border: 'none',
      background: `linear-gradient(180deg, transparent, ${theme.colors.dark[7]})`,
      opacity: '90%',
      zIndex: 1,
    },
  },
}));

interface IBookCard extends React.PropsWithChildren<any> {
  bookId: string;
  active: boolean;
  book: any;
}

const BookCard: React.FC<IBookCard> = ({ bookId, active, book }) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [isDeleteBookModalOpened, setDeleteBookModalOpened] = useState(false);
  const [isEditBookModalOpened, setEditBookModalOpened] = useState(false);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setSelectedBook(bookId));
  };

  const handleDeleteBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (bookId === '') return;

    setDeleteBookModalOpened(true);
  };

  const handleEditBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (bookId === '') return;

    setEditBookModalOpened(true);
  };

  const handleOpenBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setSelectAndActiveBook(bookId));
  };

  const bookTitle = book.title;

  return (
    <CustomCard
      active={active}
      onClick={handleCardClick}
      image={
        <Image
          className={classes.image}
          src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80"
          height={110}
          alt="Recipe Book"
        />
      }
      body={
        <Stack align="flex-start" spacing="xs">
          <Title order={1} fz={16} mb={theme.spacing.sm} underline>
            {book.title}
          </Title>
          <Text fz={12} italic mb={theme.spacing.sm} lineClamp={4}>
            {book.description}
          </Text>
        </Stack>
      }
      footer={
        <Group style={{ gap: theme.spacing.xs }}>
          <IconButton
            label="Delete Book"
            tooltipPosition={'top'}
            icon={<IconTrash color={theme.colors.red[5]} size={20} />}
            onClick={handleDeleteBook}
          />
          <DeleteBookModal
            activeBook={bookId}
            bookTitle={bookTitle}
            isDeleteBookModalOpened={isDeleteBookModalOpened}
            setDeleteBookModalOpened={setDeleteBookModalOpened}
          />
          <IconButton
            label="Edit Book"
            tooltipPosition={'top'}
            icon={<IconEdit color={theme.colors.orange[3]} size={20} />}
            onClick={handleEditBook}
          />
          <EditBookModal
            bookId={bookId}
            bookData={book}
            modalState={isEditBookModalOpened}
            closeModal={() => setEditBookModalOpened(false)}
          />

          <IconButton
            label="Open Book"
            tooltipPosition={'top'}
            icon={
              <IconArrowUpRightCircle
                color={theme.colors.orange[3]}
                size={20}
              />
            }
            onClick={handleOpenBook}
          />
        </Group>
      }
    />
  );
};

export default BookCard;
