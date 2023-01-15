import { trpc } from '@/utils/trpc';
import {
  Card,
  BackgroundImage,
  List,
  Stack,
  Title,
  Text,
  Group,
  ScrollArea,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { useAppDispatch } from '@/features/store';
import { useSelector } from 'react-redux';
import {
  selectSelectedRecipe,
  setActiveRecipe,
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

type RecipeDisplayCardProps = {};

const RecipeDisplayCard: React.FC<
  RecipeDisplayCardProps
> = ({}: RecipeDisplayCardProps) => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();
  const theme = useMantineTheme();

  const selectedRecipe = useSelector(selectSelectedRecipe);

  const recipe = trpc.useQuery([
    'recipe.getRecipeById',
    { id: selectedRecipe },
  ]);

  // const recipesList =
  //   recipeBook.status === 'success' && recipeBook.data
  //     ? recipeBook?.data.recipes.map((recipe: any) => (
  //         <List.Item key={recipe.id} c={theme.white}>
  //           {recipe.title}
  //         </List.Item>
  //       ))
  //     : null;

  const handleRecipeOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    dispatch(setActiveRecipe(selectedRecipe));
  };

  if (recipe.status === 'loading') {
    return (
      <Card radius={24} c={theme.white} bg={theme.colors.dark[9]} p={0}>
        <CustomLoader />
      </Card>
    );
  }

  return recipe.status === 'success' && recipe.data ? (
    <Card radius={24} c={theme.white} bg={theme.colors.dark[9]} p={0}>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
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
            {recipe?.data.title}
          </Title>
          <Text fz={12} italic lineClamp={4} c={theme.white}>
            {`"${recipe?.data.description}"`}
          </Text>
          <Group>
            <Text fz={12} c={theme.colors.orange[3]}>
              {`Prep Time: ${recipe.data.cookTime.hours}h ${recipe.data.cookTime.minutes}m`}
            </Text>
            <Text fz={12} c={theme.colors.orange[3]}>
              {`Cook Time: ${recipe.data.cookTime.hours}h ${recipe.data.cookTime.minutes}m`}
            </Text>
          </Group>

          <CustomButton
            label={'Open Recipe'}
            active
            onClickHandler={handleRecipeOpen}
          />
        </Stack>
      </BackgroundImage>
    </Card>
  ) : null;
};

export default RecipeDisplayCard;