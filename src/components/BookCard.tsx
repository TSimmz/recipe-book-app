import { useState } from 'react';
import {
  Card,
  Text,
  Image,
  Group,
  useMantineTheme,
  createStyles,
  Stack,
} from '@mantine/core';
import { useAppDispatch } from '@/features/store';
import { IconButton, EditBookModal, DeleteBookModal } from '@/components';
import {
  selectSelectedBook,
  selectActiveBook,
  setSelectedBook,
  setSelectAndActiveBook,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import { useHover } from '@mantine/hooks';
import { IconTrash, IconEdit, IconArrowUpRightCircle } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    transition: 'transform ease-in-out 150ms',

    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  cardActive: {
    border: `4px solid ${theme.colors.orange[3]}`,
  },
  openBookButton: {
    opacity: '0',
    transition: 'opacity ease-in-out 150ms',
  },
  openBookButtonVisible: {
    opacity: '1',
  },
}));
interface IBookCard extends React.PropsWithChildren<any> {
  bookData: any;
}

const BookCard: React.FC<IBookCard> = ({ bookData }) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();

  const dispatch = useAppDispatch();
  const selectedBook = useSelector(selectSelectedBook);

  const [isDeleteBookModalOpened, setDeleteBookModalOpened] = useState(false);
  const [isEditBookModalOpened, setEditBookModalOpened] = useState(false);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setSelectedBook(bookData.id));
  };

  const handleDeleteBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (bookData.id === '') return;

    setDeleteBookModalOpened(true);
  };

  const handleEditBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (bookData.id === '') return;

    setEditBookModalOpened(true);
  };

  const handleOpenBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setSelectAndActiveBook(bookData.id));
  };

  const placeholderImage =
    'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80';

  return (
    <Card
      withBorder
      ref={ref}
      radius={'md'}
      mih={'200px'}
      className={cx(classes.card, {
        [classes.cardActive]: bookData.id === selectedBook,
      })}
      onClick={handleCardClick}
    >
      <Stack justify={'space-around'}>
        <Text truncate>{bookData.title}</Text>
        <Card.Section>
          <Image src={bookData.image || placeholderImage} alt="Book image" />
        </Card.Section>
        <Group
          position="apart"
          className={cx(classes.openBookButton, {
            [classes.openBookButtonVisible]: hovered,
          })}
        >
          <IconButton
            label="Open Book"
            tooltipPosition={'top'}
            icon={
              <IconArrowUpRightCircle
                color={theme.colors.orange[3]}
                size={36}
              />
            }
            onClick={handleOpenBook}
          />
          <Group spacing={2}>
            <IconButton
              label="Edit Book"
              tooltipPosition={'top'}
              icon={<IconEdit color={theme.colors.orange[3]} size={20} />}
              onClick={handleEditBook}
            />
            <EditBookModal
              bookId={bookData.id}
              bookData={bookData}
              modalState={isEditBookModalOpened}
              closeModal={() => setEditBookModalOpened(false)}
            />
            <IconButton
              label="Delete Book"
              tooltipPosition={'top'}
              icon={<IconTrash color={theme.colors.red[5]} size={20} />}
              onClick={handleDeleteBook}
            />
            <DeleteBookModal
              activeBook={bookData.id}
              bookTitle={bookData.title}
              isDeleteBookModalOpened={isDeleteBookModalOpened}
              setDeleteBookModalOpened={setDeleteBookModalOpened}
            />
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default BookCard;
