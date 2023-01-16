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
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconTrash } from '@tabler/icons';
import { IconCirclePlus } from '@tabler/icons';
import { randomId } from '@mantine/hooks';
import { z } from 'zod';

const useStyles = createStyles((theme) => ({}));

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
    .array()
    .nonempty(),
  steps: z
    .object({
      key: z.string(),
      stepNumber: z.number().positive().int(),
      description: z.string(),
      note: z.string().optional(),
    })
    .array()
    .nonempty(),
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
    <Flex key={`${item.key}-${index}`}>
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
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem('ingredients', index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Flex>
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
    <Flex key={`${item.key}-${index}`}>
      <Textarea
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
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem('steps', index)}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Flex>
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
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
        <Title order={5}>Prep Time</Title>
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
        <Title order={5}>Cook Time</Title>
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
        <NumberInput
          label="Number of Servings"
          stepHoldDelay={500}
          stepHoldInterval={100}
          required
          min={0}
          max={100}
          {...form.getInputProps('numberOfServings')}
        />

        <Title order={5}>Ingredients</Title>
        {ingredientFields}
        <Button
          color="yellow"
          rightIcon={<IconCirclePlus size={16} />}
          onClick={handleAddIngredient}
        >
          Add
        </Button>
        <Title order={5}>Steps</Title>
        {stepsFields}
        <Button
          color="yellow"
          rightIcon={<IconCirclePlus size={16} />}
          onClick={handleAddStep}
        >
          Add
        </Button>
        <br />
        <br />

        <Button type="submit" color="yellow" radius="md" size="md">
          Save Recipe
        </Button>
        <Button
          color="yellow"
          radius="md"
          size="md"
          onClick={() => {
            closeModal();
          }}
        >
          {' '}
          Cancel{' '}
        </Button>
      </form>
    </Modal>
  );
};

export default CreateRecipeModal;
