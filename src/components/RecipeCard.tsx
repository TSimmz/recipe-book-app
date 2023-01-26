import { useState } from 'react';
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
import { CustomCard, IconButton, DeleteRecipeModal } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  setSelectedRecipe,
  setSelectAndActiveRecipe,
} from '@/features/dashboard/dashboardSlice';
import { IconTrash, IconArrowUpRightCircle } from '@tabler/icons';

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

interface IRecipeCard extends React.PropsWithChildren<any> {
  recipeId: string;
  active: boolean;
  recipe: any;
}

const RecipeCard: React.FC<IRecipeCard> = ({ recipeId, active, recipe }) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [isDeleteRecipeModalOpened, setDeleteRecipeModalOpened] =
    useState(false);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setSelectedRecipe(recipeId));
  };

  const handleDeleteRecipe = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (recipeId === '') return;

    setDeleteRecipeModalOpened(true);
  };

  const handleOpenRecipe = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setSelectAndActiveRecipe(recipeId));
  };

  const recipeTitle = recipe.title;

  return (
    <CustomCard
      active={active}
      onClick={handleCardClick}
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
          <Group position="apart">
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {`Prep Time: ${
                recipe.prepTime.hours ? `${recipe.prepTime.hours}h` : ''
              } ${
                recipe.prepTime.minutes ? `${recipe.prepTime.minutes}m` : ''
              }`}
            </Text>
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {`Cook Time: ${
                recipe.cookTime.hours ? `${recipe.cookTime.hours}h` : ''
              } ${
                recipe.cookTime.minutes ? `${recipe.cookTime.minutes}m` : ''
              }`}
            </Text>
          </Group>
          <Text fz={12} italic lineClamp={3}>
            {recipe.description}
          </Text>
          <Divider color={theme.white} size={2} />
          {/** TODO: Recipe tags will go here */}
        </Stack>
      }
      footer={
        <Group style={{ gap: theme.spacing.xs }}>
          <IconButton
            label="Delete Recipe"
            tooltipPosition={'top'}
            icon={<IconTrash color={theme.colors.red[5]} size={20} />}
            onClick={handleDeleteRecipe}
          />
          <DeleteRecipeModal
            activeRecipe={recipeId}
            recipeTitle={recipeTitle}
            isDeleteRecipeModalOpened={isDeleteRecipeModalOpened}
            setDeleteRecipeModalOpened={setDeleteRecipeModalOpened}
          />
          <IconButton
            label="Open Recipe"
            tooltipPosition={'top'}
            icon={
              <IconArrowUpRightCircle
                color={theme.colors.orange[3]}
                size={20}
              />
            }
            onClick={handleOpenRecipe}
          />
        </Group>
      }
    />
  );
};

export default RecipeCard;
