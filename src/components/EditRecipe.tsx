import {
  Group,
  Image,
  Card,
  useMantineTheme,
  Divider,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Textarea,
  NumberInput,
  createStyles,
} from '@mantine/core';
import { CustomButton, IconButton } from '@/components';
import { useAppDispatch } from '@/features/store';
import { clearActiveRecipe } from '@/features/dashboard/dashboardSlice';
import { useForm, zodResolver } from '@mantine/form';
import { IconTrash } from '@tabler/icons';
import { randomId } from '@mantine/hooks';
import { z } from 'zod';
import { useEffect } from 'react';

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
  form: {
    '& .mantine-TextInput-label, .mantine-Textarea-label, .mantine-NumberInput-label':
      {
        marginBottom: theme.spacing.xs,
      },

    '& .mantine-TextInput-required, .mantine-Textarea-required, .mantine-NumberInput-required':
      {
        color: theme.colors.orange[3],
      },
  },

  stack: {
    paddingRight: theme.spacing.md,
  },

  ingredientField: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
}));

const editRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.object({
    hours: z.number().nonnegative().int(),
    minutes: z.number().nonnegative().int().max(59),
  }),
  cookTime: z.object({
    hours: z.number().nonnegative().int(),
    minutes: z.number().nonnegative().int().max(59),
  }),
  numberOfServings: z.number().int().positive().min(1),
  ingredients: z
    .object({
      key: z.string(),
      value: z.number(),
      unit: z.string(),
      name: z.string(),
    })
    .array(),
  steps: z
    .object({
      key: z.string(),
      stepNumber: z.number().positive().int(),
      description: z.string(),
      note: z.string().optional(),
    })
    .array(),
});

type EditRecipeProps = {
  recipeId: string;
  recipeData: any;
};

const EditRecipe: React.FC<EditRecipeProps> = ({
  recipeId,
  recipeData,
}: EditRecipeProps) => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();
  const theme = useMantineTheme();

  const editForm = useForm({
    validate: zodResolver(editRecipeSchema),
    initialValues: {
      title: '',
      description: '',
      prepTime: {
        hours: 0,
        minutes: 0,
      },
      cookTime: {
        hours: 0,
        minutes: 0,
      },
      numberOfServings: 1,
      ingredients: [{ key: randomId(), value: 0, unit: '', name: '' }],
      steps: [{ key: randomId(), stepNumber: 1, description: '', note: '' }],
    },
  });

  useEffect(() => {
    editForm.setValues(recipeData);
  }, []);

  const ingredients = recipeData.ingredients.map(
    (ingredient: any, index: number) => (
      <Group key={ingredient.key} mb={theme.spacing.xs}>
        <NumberInput
          label="Value"
          stepHoldDelay={500}
          stepHoldInterval={100}
          min={0}
          required
          {...editForm.getInputProps(`ingredients.${index}.value`)}
        />
        <TextInput
          placeholder="Unit"
          label="Unit"
          required
          {...editForm.getInputProps(`ingredients.${index}.unit`)}
        />
        <TextInput
          placeholder="Name"
          label="Name"
          required
          {...editForm.getInputProps(`ingredients.${index}.name`)}
        />
        <IconButton
          label="Delete"
          tooltipPosition={'top'}
          icon={<IconTrash color={theme.colors.red[5]} size={20} />}
          handleClick={() => editForm.removeListItem('ingredients', index)}
        />
      </Group>
    ),
  );

  const steps = recipeData.steps.map((step: any, index: number) => (
    <div
      key={step.key}
      style={{
        marginBottom: theme.spacing.md,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Textarea
        style={{ flexGrow: 1 }}
        placeholder="Description"
        label="Description"
        required
        {...editForm.getInputProps(`steps.${index}.description`)}
      />
      <Textarea
        placeholder="Note"
        label="Note"
        {...editForm.getInputProps(`steps.${index}.note`)}
      />
      <IconButton
        label="Delete"
        tooltipPosition={'top'}
        icon={<IconTrash color={theme.colors.red[5]} size={20} />}
        handleClick={() => editForm.removeListItem('steps', index)}
      />
    </div>
  ));

  const handleBackClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    return dispatch(clearActiveRecipe());
  };

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
        <TextInput
          fz={32}
          fw={'normal'}
          c={theme.white}
          ff={theme.fontFamily}
          placeholder="Recipe Title"
          label="Recipe Title"
          required
          {...editForm.getInputProps('title')}
        />
        <CustomButton label="Save" onClickHandler={handleBackClick} />
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
              {'Prep Time: '}
            </Text>
            <NumberInput
              label="Hours"
              stepHoldDelay={500}
              stepHoldInterval={100}
              min={0}
              required
              {...editForm.getInputProps('prepTime.hours')}
            />
            <NumberInput
              label="Minutes"
              stepHoldDelay={500}
              stepHoldInterval={100}
              required
              min={0}
              max={59}
              {...editForm.getInputProps('prepTime.minutes')}
            />

            <Text size={14} fs="italic" mr={32}>
              {'Cook Time: '}
            </Text>
            <NumberInput
              label="Hours"
              stepHoldDelay={500}
              stepHoldInterval={100}
              min={0}
              required
              {...editForm.getInputProps('cookTime.hours')}
            />
            <NumberInput
              label="Minutes"
              stepHoldDelay={500}
              stepHoldInterval={100}
              required
              min={0}
              max={59}
              {...editForm.getInputProps('cookTime.minutes')}
            />

            <Group position="left">
              <Text size={14} mr={-10} fs="italic">
                Servings:
              </Text>
              <NumberInput
                label="Number of Servings"
                stepHoldDelay={500}
                stepHoldInterval={100}
                required
                min={0}
                max={100}
                {...editForm.getInputProps('numberOfServings')}
              />
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
  );
};

export default EditRecipe;
