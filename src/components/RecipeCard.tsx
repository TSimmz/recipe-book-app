import {
  Stack,
  Title,
  Text,
  Image,
  Group,
  useMantineTheme,
  Divider,
  createStyles,
} from '@mantine/core';
import { CustomCard } from '@/components';
import { useAppDispatch } from '@/features/store';
import { setActiveRecipe } from '@/features/dashboard/dashboardSlice';

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

type RecipeCardProps = {
  recipeId: string;
  active: boolean;
  recipe: any;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipeId,
  active,
  recipe,
}: RecipeCardProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setActiveRecipe(recipeId));
  };

  return (
    <CustomCard
      active={active}
      onClickHandler={handleCardClick}
      image={
        <Image
          className={classes.image}
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
          height={110}
          alt="Recipe"
        />
      }
      body={
        <Stack align="flex-start" spacing="xs">
          <Title order={1} fw="normal" fz={16} ff={theme.fontFamily} underline>
            {recipe.title}
          </Title>
          <Group position="apart" w="100%">
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {'Prep Time: 1h 25m'}
            </Text>
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {`Cook Time: ${recipe.cookTime.hours}h ${recipe.cookTime.minutes}m`}
            </Text>
          </Group>
          <Text fz={12} italic lineClamp={3}>
            {recipe.description}
          </Text>
          <Divider color={theme.white} size={2} />
          {/** TODO: Recipe tags will go here */}
        </Stack>
      }
    />
  );
};

export default RecipeCard;
