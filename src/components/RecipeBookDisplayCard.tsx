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
import { useAppDispatch } from '@/features/store';
import { useSelector } from 'react-redux';
import {
  selectSelectedRecipeBook,
  setActiveRecipeBook,
} from '@/features/dashboard/dashboardSlice';
import { CustomButton, CustomLoader } from '@/components';

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

type RecipeBookDisplayCardProps = {};

const RecipeBookDisplayCard: React.FC<
  RecipeBookDisplayCardProps
> = ({}: RecipeBookDisplayCardProps) => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();
  const theme = useMantineTheme();

  const selectedRecipeBook = useSelector(selectSelectedRecipeBook);

  const recipeBook = trpc.useQuery([
    'recipebook.getRecipeBookWithRecipesById',
    { id: selectedRecipeBook },
  ]);

  const recipesList =
    recipeBook.status === 'success' && recipeBook.data
      ? recipeBook?.data.recipes.map((recipe: any) => (
          <List.Item key={recipe.id} c={theme.white}>
            {recipe.title}
          </List.Item>
        ))
      : null;

  const handleRecipeBookOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    dispatch(setActiveRecipeBook(selectedRecipeBook));
  };

  if (recipeBook.status === 'loading') {
    return (
      <Card radius={24} c={theme.white} bg={theme.colors.dark[9]} p={0}>
        <CustomLoader />
      </Card>
    );
  }

  return recipeBook.status === 'success' && recipeBook.data ? (
    <Card radius={24} c={theme.white} bg={theme.colors.dark[9]} p={0}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80"
        className={classes.background}
      >
        <Stack p={16} className={classes.stack}>
          <Title
            order={1}
            fw="normal"
            fz={20}
            c={theme.white}
            ff={theme.fontFamily}
          >
            {recipeBook?.data.title}
          </Title>
          <Text fz={12} italic lineClamp={4} c={theme.white}>
            {`"${recipeBook?.data.description}"`}
          </Text>
          <Text fz={14} underline c={theme.white}>
            {'Recipes'}
          </Text>
          <ScrollArea style={{ height: 150 }} offsetScrollbars>
            <List size="xs">{recipesList}</List>
          </ScrollArea>
          <CustomButton
            label={'Open Book'}
            active
            onClickHandler={handleRecipeBookOpen}
          />
        </Stack>
      </BackgroundImage>
    </Card>
  ) : null;
};

export default RecipeBookDisplayCard;
