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
import { selectActiveRecipeBook } from '@/features/dashboard/dashboardSlice';
import CustomButton from './CustomButton';

const useStyles = createStyles((theme) => ({
  background: {
    position: 'relative',

    '&::after': {
      position: 'absolute',
      content: '""',
      display: 'block',
      inset: 0,
      borderColor: theme.colors.dark[4],
      backgroundColor: theme.colors.dark[4],
      opacity: 0.8,
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
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const recipeBook = trpc.useQuery([
    'recipebook.getRecipeBookWithRecipesById',
    { id: activeRecipeBook },
  ]);

  const recipesList =
    recipeBook.status === 'success' && recipeBook.data
      ? recipeBook?.data.recipes.map((recipe: any) => (
          <List.Item key={recipe.id} c={theme.white}>
            {recipe.title}
          </List.Item>
        ))
      : null;

  return recipeBook.status === 'success' && recipeBook.data ? (
    <Card radius={24} c={theme.white} bg={theme.colors.dark[6]} p={0}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80"
        className={classes.background}
      >
        <Stack p={16} className={classes.stack}>
          <Title order={1} fw="normal" fz={20} ff={theme.fontFamily}>
            {recipeBook?.data.title}
          </Title>
          <Text fz={12} italic lineClamp={4}>
            {`"${recipeBook?.data.description}"`}
          </Text>
          <Text fz={14} underline>
            {'Recipes'}
          </Text>
          <ScrollArea style={{ height: 150 }} offsetScrollbars>
            <List size="xs">{recipesList}</List>
          </ScrollArea>
          <CustomButton label={'Open Book'} />
        </Stack>
      </BackgroundImage>
    </Card>
  ) : null;
};

export default RecipeBookDisplayCard;
