import { trpc } from '@/utils/trpc';
import {
  Button,
  Flex,
  TextInput,
  Textarea,
  NumberInput,
  Title,
  ActionIcon,
  Modal,
  useMantineTheme,
  createStyles,
  Stack,
  ScrollArea,
  Group,
} from '@mantine/core';
import { CustomButton, IconButton } from '@/components';
import { useForm, zodResolver } from '@mantine/form';
import { IconTrash, IconCirclePlus } from '@tabler/icons';
import { randomId } from '@mantine/hooks';
import { z } from 'zod';

const useStyles = createStyles((theme) => ({
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

const createRecipeSchema = z.object({
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

type CreateRecipeModalProps = {
  bookId: string;
  modalState: boolean;
  closeModal: () => void;
};

const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  bookId,
  modalState,
  closeModal,
}: CreateRecipeModalProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const createRecipe = trpc.useMutation(['recipe.createRecipe'], {
    onSuccess: () => {},
  });

  // Form set up
  const form = useForm({
    validate: zodResolver(createRecipeSchema),
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

  const handleAddIngredient = () => {
    form.insertListItem('ingredients', {
      key: randomId(),
      value: 0,
      unit: '',
      name: '',
    });
  };

  const ingredientFields = form.values.ingredients.map((item, index) => (
    <div className={classes.ingredientField} key={`${item.key}-${index}`}>
      <NumberInput
        label="Value"
        stepHoldDelay={500}
        stepHoldInterval={100}
        min={0}
        required
        {...form.getInputProps(`ingredients.${index}.value`)}
      />
      <TextInput
        placeholder="Unit"
        label="Unit"
        required
        {...form.getInputProps(`ingredients.${index}.unit`)}
      />
      <TextInput
        placeholder="Name"
        label="Name"
        required
        {...form.getInputProps(`ingredients.${index}.name`)}
      />
      <IconButton
        label="Delete"
        tooltipPosition={'top'}
        icon={<IconTrash color={theme.colors.red[5]} size={20} />}
        handleClick={() => form.removeListItem('ingredients', index)}
      />
    </div>
  ));

  const handleAddStep = () => {
    form.insertListItem('steps', {
      key: randomId(),
      stepNumber: 1,
      description: '',
      note: '',
    });
  };

  const stepsFields = form.values.steps.map((item, index) => (
    <div className={classes.ingredientField} key={`${item.key}-${index}`}>
      <Textarea
        style={{ flexGrow: 1 }}
        placeholder="Description"
        label="Description"
        required
        {...form.getInputProps(`steps.${index}.description`)}
      />
      <Textarea
        placeholder="Note"
        label="Note"
        {...form.getInputProps(`steps.${index}.note`)}
      />
      <IconButton
        label="Delete"
        tooltipPosition={'top'}
        icon={<IconTrash color={theme.colors.red[5]} size={20} />}
        handleClick={() => form.removeListItem('steps', index)}
      />
    </div>
  ));

  const handleSubmit = (values: typeof form.values) => {
    // Create the recipe
    createRecipe.mutate({ recipeBookId: bookId, ...values });

    // Close the modal
    closeModal();
  };

  return (
    <Modal
      title="Create a New Recipe"
      opened={modalState}
      radius={18}
      centered
      onClose={() => closeModal()}
      size="lg"
    >
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea.Autosize maxHeight={800} offsetScrollbars>
          <Stack className={classes.stack}>
            <TextInput
              placeholder="Recipe Title"
              label="Recipe Title"
              required
              {...form.getInputProps('title')}
            />
            <Textarea
              placeholder="Description"
              label="Description"
              required
              {...form.getInputProps('description')}
            />
            <Title
              order={5}
              mb={-theme.spacing.md}
              ff={theme.fontFamily}
              mt={theme.spacing.md}
            >
              Prep Time
            </Title>
            <Group grow>
              <NumberInput
                label="Hours"
                stepHoldDelay={500}
                stepHoldInterval={100}
                min={0}
                required
                {...form.getInputProps('prepTime.hours')}
              />
              <NumberInput
                label="Minutes"
                stepHoldDelay={500}
                stepHoldInterval={100}
                required
                min={0}
                max={59}
                {...form.getInputProps('prepTime.minutes')}
              />
            </Group>
            <Title
              order={5}
              mb={-theme.spacing.md}
              ff={theme.fontFamily}
              mt={theme.spacing.md}
            >
              Cook Time
            </Title>
            <Group grow>
              <NumberInput
                label="Hours"
                stepHoldDelay={500}
                stepHoldInterval={100}
                min={0}
                required
                {...form.getInputProps('cookTime.hours')}
              />
              <NumberInput
                label="Minutes"
                stepHoldDelay={500}
                stepHoldInterval={100}
                required
                min={0}
                max={59}
                {...form.getInputProps('cookTime.minutes')}
              />
            </Group>
            <NumberInput
              label="Number of Servings"
              stepHoldDelay={500}
              stepHoldInterval={100}
              required
              min={0}
              max={100}
              {...form.getInputProps('numberOfServings')}
            />
            <Stack mt={theme.spacing.md}>
              <Title order={5} mb={-theme.spacing.md} ff={theme.fontFamily}>
                Ingredients
              </Title>
              {ingredientFields}
              <CustomButton
                active
                label={'Add Ingredient'}
                rightIcon={<IconCirclePlus size={16} />}
                onClickHandler={handleAddIngredient}
              />
            </Stack>
            <Stack mt={theme.spacing.md}>
              <Title order={5} mb={-theme.spacing.md} ff={theme.fontFamily}>
                Directions
              </Title>
              {stepsFields}
              <CustomButton
                active
                label={'Add Step'}
                rightIcon={<IconCirclePlus size={16} />}
                onClickHandler={handleAddStep}
              />
            </Stack>

            <Group mt={theme.spacing.xl} position="apart">
              <CustomButton type="submit" label="Save New Recipe" active />
              <CustomButton
                label="Cancel"
                active
                onClickHandler={() => closeModal()}
              />
            </Group>
          </Stack>
        </ScrollArea.Autosize>
      </form>
    </Modal>
  );
};

export default CreateRecipeModal;
