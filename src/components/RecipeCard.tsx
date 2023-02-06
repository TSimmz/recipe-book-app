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
  Card,
  CardSection,
} from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    gap: theme.other.remSizing.md,
    cursor: 'pointer',
    transition: 'transform ease-in-out 150ms',

    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  cardActive: {
    border: `4px solid ${theme.colors.orange[3]}`,
  },
}));

interface IRecipeCard extends React.PropsWithChildren<any> {
  recipeData: any;
}

const RecipeCard: React.FC<IRecipeCard> = ({ recipeData }) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Link href={`/recipe/${recipeData.id}`}>
      <Card
        radius={'lg'}
        mih={'200px'}
        className={classes.card}
        m={theme.spacing.xs}
      >
        <div
          style={{
            height: 180,
            marginTop: -1 * theme.spacing.md,
            marginBottom: -1 * theme.spacing.md,
            marginLeft: -1 * theme.spacing.md,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
            alt="Recipe"
            height={200}
            width={150}
          />
        </div>
        <Stack spacing="xs">
          <Text>{recipeData.title}</Text>
          <Group>
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {`Prep Time: ${
                recipeData.prepTime.hours ? `${recipeData.prepTime.hours}h` : ''
              } ${
                recipeData.prepTime.minutes
                  ? `${recipeData.prepTime.minutes}m`
                  : ''
              }`}
            </Text>
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {`Cook Time: ${
                recipeData.cookTime.hours ? `${recipeData.cookTime.hours}h` : ''
              } ${
                recipeData.cookTime.minutes
                  ? `${recipeData.cookTime.minutes}m`
                  : ''
              }`}
            </Text>
          </Group>
          <Text fz={12} italic lineClamp={3}>
            {recipeData.description}
          </Text>
        </Stack>
      </Card>
    </Link>
  );
};

export default RecipeCard;
