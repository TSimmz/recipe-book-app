import { trpc } from '@/utils/trpc';
import {
  Card,
  BackgroundImage,
  List,
  Stack,
  Title,
  Text,
  ScrollArea,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectSelectedBook } from '@/features/dashboard/dashboardSlice';
import { CustomLoader } from '@/components';

const useStyles = createStyles((theme) => ({
  background: {
    position: 'relative',

    '&::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      inset: 0,
      background: `linear-gradient(180deg, ${theme.colors.dark[7]} 10%, ${theme.black} 75%)`,
      opacity: '90%',
      zIndex: 0,
    },
  },

  stack: {
    '> * ': {
      zIndex: 1,
    },
  },
}));

interface IBookDisplayCard extends React.PropsWithChildren<any> {}

const BookDisplayCard: React.FC<IBookDisplayCard> = ({}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const selectedBook = useSelector(selectSelectedBook);

  const book = trpc.useQuery([
    'book.getBookWithRecipesById',
    { id: selectedBook },
  ]);

  const recipesList =
    book.status === 'success' && book.data
      ? book?.data.recipes.map((recipe: any) => (
          <List.Item key={recipe.id} c={theme.white}>
            {recipe.title}
          </List.Item>
        ))
      : null;

  if (book.status === 'loading') {
    return (
      <Card radius={24} c={theme.white} bg={theme.colors.dark[9]} p={0}>
        <CustomLoader />
      </Card>
    );
  }

  return book.status === 'success' && book.data ? (
    <Card radius={24} c={theme.white} bg={theme.colors.dark[9]} p={0}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80"
        className={classes.background}
      >
        <Stack p={16} className={classes.stack}>
          <Title order={1} fz={20} c={theme.white}>
            {book?.data.title}
          </Title>
          <Text fz={12} italic lineClamp={4} c={theme.white}>
            {`"${book?.data.description}"`}
          </Text>
          <Text fz={14} underline c={theme.white}>
            {'Recipes'}
          </Text>
          <ScrollArea style={{ height: 150 }} offsetScrollbars>
            <List size="xs">{recipesList}</List>
          </ScrollArea>
        </Stack>
      </BackgroundImage>
    </Card>
  ) : null;
};

export default BookDisplayCard;