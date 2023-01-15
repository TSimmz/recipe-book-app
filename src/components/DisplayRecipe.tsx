import { useSelector } from 'react-redux';
import { trpc } from '@/utils/trpc';
import {
  Container,
  Title,
  Card,
  Group,
  Image,
  Flex,
  Text,
  useMantineTheme,
  Divider,
  ScrollArea,
  Loader,
  Stack,
  createStyles,
} from '@mantine/core';
import { CustomButton } from '@/components';
import { IconUser } from '@tabler/icons';
import { useAppDispatch } from '@/features/store';
import {
  clearActiveRecipe,
  selectActiveRecipe,
  selectActiveRecipeBook,
} from '@/features/dashboard/dashboardSlice';

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

type DisplayRecipeProps = {};

const DisplayRecipe: React.FC<
  DisplayRecipeProps
> = ({}: DisplayRecipeProps) => {
  const dispatch = useAppDispatch();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
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
    <Group key={ingredient?.key} mb={theme.spacing.xs}>
      <Text mr={-10}>{ingredient.value}</Text>
      <Text>{ingredient.unit}</Text>
      <Text>{ingredient.name}</Text>
    </Group>
  ));

  const steps = recipe.data?.steps.map((step) => (
    <Group key={step?.key} mb={theme.spacing.md}>
      <Text>{`${step.stepNumber})`}</Text>
      <Text>{step.description}</Text>
    </Group>
  ));

  const handleBackClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    return dispatch(clearActiveRecipe());
  };

  if (recipe.status === 'loading') {
    return (
      <Container w={'100%'} mx={theme.spacing.xl} py={theme.spacing.lg}>
        <Loader color={theme.colors.appOrange[5]} size="lg" />
      </Container>
    );
  }

  // if (recipe.status === 'error') {

  // }

  return recipe.status === 'success' && recipe.data ? (
    <Card p={theme.spacing.xl} className={classes.cardContainer}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
          height={150}
          alt="Recipe"
        />
      </Card.Section>
      <Group position="apart" mt={theme.spacing.md} mb={theme.spacing.sm}>
        <Title fz={32} fw={'normal'} c={theme.white} ff={theme.fontFamily}>
          {recipe.data.title}
        </Title>
        {activeRecipeBook !== '' ? (
          <CustomButton label="Back" onClickHandler={handleBackClick} />
        ) : null}
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
            <Text
              size={14}
              fs="italic"
              mr={32}
            >{`Prep Time: ${recipe.data?.cookTime.hours}hr ${recipe.data?.cookTime.minutes}min`}</Text>
            <Text
              size={14}
              fs="italic"
              mr={32}
            >{`Cook Time: ${recipe.data?.cookTime.hours}hr ${recipe.data?.cookTime.minutes}min`}</Text>
            <Group position="left">
              <Text size={14} mr={-10} fs="italic">
                Servings:
              </Text>
              <Flex gap={2}>{servingSizeField}</Flex>
            </Group>
          </Group>

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
  ) : null;
};

export default DisplayRecipe;