import { useSelector } from 'react-redux';
import { trpc } from '@/utils/trpc';
import useStyles from './styles';
import {
  Container,
  Title,
  Group,
  Flex,
  Text,
  useMantineTheme,
  Loader,
} from '@mantine/core';
import { IconUser } from '@tabler/icons';
import { selectActiveRecipe } from '@/features/dashboard/dashboardSlice';

type DisplayRecipeProps = {};

const DisplayRecipe: React.FC<
  DisplayRecipeProps
> = ({}: DisplayRecipeProps) => {
  const activeRecipe = useSelector(selectActiveRecipe);
  const recipe = trpc.useQuery(['recipe.getRecipeById', { id: activeRecipe }]);

  const { classes } = useStyles();
  const theme = useMantineTheme();

  let servingSizeField = [];
  if (typeof recipe.data?.numberOfServings === 'number') {
    for (let i = 0; i < recipe.data?.numberOfServings; ++i) {
      servingSizeField.push(<IconUser size={16} style={{ margin: 0 }} />);
    }
  }

  const ingredients = recipe.data?.ingredients.map((ingredient) => (
    <Group key={ingredient?.key} mb={theme.spacing.md}>
      <Text mr={-10}>{ingredient.value}</Text>
      <Text>{ingredient.unit}</Text>
      <Text>{ingredient.name}</Text>
    </Group>
  ));

  const steps = recipe.data?.steps.map((step) => (
    <Group key={step?.key} mb={theme.spacing.md}>
      <Text>{`${step.stepNumber})`}</Text>
      <Text>{step.description}</Text>
      {step.note ? <Text ml={48}>{step.note}</Text> : null}
    </Group>
  ));

  if (recipe.status === 'loading') {
    return (
      <Container w={'100%'} mx={theme.spacing.xl} py={theme.spacing.lg}>
        <Loader color={theme.colors.appOrange[5]} size="lg" />
      </Container>
    );
  }

  // if (recipe.status === 'error') {

  // }

  return (
    <Container w={'100%'} mx={theme.spacing.xl} py={theme.spacing.lg}>
      <Title
        size={48}
        fw={400}
        pb={16}
        mb={theme.spacing.md}
        className={classes.title}
      >
        {recipe.data?.title}
      </Title>
      <Group w="100%" mb={theme.spacing.xl}>
        <Text
          size={14}
          fs="italic"
          mr={32}
        >{`Cook Time: ${recipe.data?.cookTime.hours}hr ${recipe.data?.cookTime.minutes}min`}</Text>
        <Group position="left">
          <Text size={14} mr={-10} fs="italic">
            Serving Size:
          </Text>
          <Flex gap={2}>{servingSizeField}</Flex>
        </Group>
      </Group>
      <Text size={24} mb={theme.spacing.md} td="underline">
        Ingredients
      </Text>
      {ingredients}
      <Text size={24} my={theme.spacing.md} td="underline">
        Steps
      </Text>
      {steps}
    </Container>
  );
};

export default DisplayRecipe;
