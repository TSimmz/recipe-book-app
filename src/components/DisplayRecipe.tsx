import {
  Title,
  Card,
  Group,
  Image,
  Flex,
  Text,
  useMantineTheme,
  Divider,
  ScrollArea,
  Stack,
  createStyles,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { CustomButton } from '@/components';
import { IconUser } from '@tabler/icons';
import { useAppDispatch } from '@/features/store';

const useStyles = createStyles((theme) => ({
  cardContainer: {
    borderRadius: theme.spacing.lg,
    margin: 0,
    marginLeft: '1rem',
    backgroundColor: theme.colors.dark[6],
  },
  cardGrid: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.md,
    margin: 0,
  },
}));

interface IDisplayRecipe extends React.PropsWithChildren<any> {
  recipeData: any;
  setIsEditRecipe: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayRecipe: React.FC<IDisplayRecipe> = ({
  recipeData,
  setIsEditRecipe,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  let servingSizeField = [];
  if (typeof recipeData.numberOfServings === 'number') {
    for (let i = 0; i < recipeData.numberOfServings; ++i) {
      servingSizeField.push(
        <IconUser key={randomId()} size={16} style={{ margin: 0 }} />,
      );
    }
  }

  const ingredients = recipeData.ingredients.map((ingredient: any) => (
    <Group key={ingredient.key} mb={theme.spacing.xs}>
      <Text mr={-10}>{ingredient.value}</Text>
      <Text>{ingredient.unit}</Text>
      <Text>{ingredient.name}</Text>
    </Group>
  ));

  const steps = recipeData.steps.map((step: any, index: number) => (
    <div
      key={step.key}
      style={{
        marginBottom: theme.spacing.md,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Text>{`${index + 1})`}</Text>
      <Text style={{ flexGrow: 1, marginLeft: theme.spacing.sm }}>
        {step.description}
      </Text>
    </div>
  ));

  return (
    <Card p={theme.spacing.xl} className={classes.cardContainer}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
          height={150}
          alt="Recipe"
        />
      </Card.Section>
      <Group position="apart" mt={theme.spacing.md} mb={theme.spacing.sm}>
        <Title fz={32} c={theme.white}>
          {recipeData.title}
        </Title>
        <Group>
          <CustomButton
            label="Edit Recipe"
            active
            onClick={() => setIsEditRecipe(true)}
          />
        </Group>
      </Group>

      <Divider color={theme.white} size={2} />

      <ScrollArea.Autosize
        offsetScrollbars
        scrollHideDelay={150}
        mt={theme.spacing.xs}
        maxHeight={'82vh'}
        style={{ width: '100%' }}
      >
        <div className={classes.cardGrid}>
          <Group w="100%" mb={theme.spacing.xl}>
            <Text size={14} fs="italic" mr={32}>
              {' '}
              {`Prep Time: ${
                recipeData.prepTime.hours ? `${recipeData.prepTime.hours}h` : ''
              } ${
                recipeData.prepTime.minutes
                  ? `${recipeData.prepTime.minutes}m`
                  : ''
              }`}
            </Text>
            <Text size={14} fs="italic" mr={32}>
              {' '}
              {`Cook Time: ${
                recipeData.cookTime.hours ? `${recipeData.cookTime.hours}h` : ''
              } ${
                recipeData.cookTime.minutes
                  ? `${recipeData.cookTime.minutes}m`
                  : ''
              }`}
            </Text>
            <Group position="left">
              <Text size={14} mr={-10} fs="italic">
                Servings:
              </Text>
              <Flex gap={2}>{servingSizeField}</Flex>
            </Group>
          </Group>

          <Stack mb={theme.spacing.xl} style={{ gap: theme.spacing.xs }}>
            <Text size={24} mb={theme.spacing.xs} td="underline">
              Description
            </Text>
            <Text italic>{recipeData.description}</Text>
          </Stack>

          <Stack mb={theme.spacing.xl} style={{ gap: theme.spacing.xs }}>
            <Text size={24} mb={theme.spacing.xs} td="underline">
              Ingredients
            </Text>
            {ingredients}
          </Stack>
          <Stack style={{ gap: theme.spacing.xs }}>
            <Text size={24} my={theme.spacing.md} td="underline">
              Directions
            </Text>
            {steps}
          </Stack>
        </div>
      </ScrollArea.Autosize>
    </Card>
  );
};

export default DisplayRecipe;
