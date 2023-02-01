import {
  Card,
  Text,
  Image,
  useMantineTheme,
  createStyles,
  Stack,
} from '@mantine/core';
import { useAppDispatch } from '@/features/store';
import {
  selectSelectedBook,
  selectActiveBook,
  setSelectedBook,
  setSelectAndActiveBook,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';

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
}));
interface IBookCard extends React.PropsWithChildren<any> {
  bookId: string;
  title: string;
  image?: string;
}

const BookCard: React.FC<IBookCard> = ({ bookId, title, image }) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const dispatch = useAppDispatch();
  const selectedBook = useSelector(selectSelectedBook);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setSelectedBook(bookId));
  };

  const placeholderImage =
    'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80';

  return (
    <Card
      radius={'md'}
      mih={'200px'}
      className={cx(classes.card, {
        [classes.cardActive]: bookId === selectedBook,
      })}
      onClick={handleCardClick}
    >
      <Stack justify={'space-around'}>
        <Image src={image || placeholderImage} alt="Book image" radius={'md'} />
        <Text truncate>{title}</Text>
      </Stack>
    </Card>
  );
};

export default BookCard;
