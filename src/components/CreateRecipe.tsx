import {
  Button,
  Flex,
  TextInput,
  Textarea,
  NumberInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconCirclePlus } from '@tabler/icons';
import { randomId } from '@mantine/hooks';
import { z } from 'zod';

const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  cookTime: z.object({
    hours: z.number().nonnegative().int().min(0),
    minutes: z.number().positive().int().min(0).max(59),
  }),
  numberOfServings: z.number().int().positive().min(1),
  ingredients: z
    .object({
      value: z.number(),
      unit: z.string(),
      name: z.string(),
    })
    .array()
    .nonempty(),
  steps: z
    .object({
      stepNumber: z.number().positive().int(),
      description: z.string(),
      note: z.string(),
    })
    .array()
    .nonempty(),
});

type CreateRecipeProps = {
  recipeBookId: string;
  setOpenCreateRecipe: React.Dispatch<React.SetStateAction<boolean>>;
  recipeMutation: any;
};

const CreateRecipe: React.FC<CreateRecipeProps> = ({
  recipeBookId,
  setOpenCreateRecipe,
  recipeMutation,
}: CreateRecipeProps) => {
  // Form set up
  const form = useForm({
    validate: zodResolver(createRecipeSchema),
    initialValues: {
      title: '',
      description: '',
      cookTime: {
        hours: 0,
        minutes: 0,
      },
      numberOfServings: 1,
      ingredients: [{ key: randomId(), value: 0, unit: '', name: '' }],
      steps: [{ stepNumber: 1, description: '', note: '' }],
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

  const handleRemoveIngredient = () => {};

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
    </Flex>
  ));

  const handleAddStep = () => {};

  const renderSteps = () => {};

  const handleSubmit = (values: typeof form.values) => {
    // Create the recipe
    console.log('Recipe Values: ', values);
    // const create = recipeMutation.mutate({
    //   recipeBookId,
    //   ...values,
    // });
    // Close the modal
    setOpenCreateRecipe(false);
  };

  return (
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
        Save Recipe Book
      </Button>
      <Button
        color="yellow"
        radius="md"
        size="md"
        onClick={() => {
          setOpenCreateRecipe(false);
        }}
      >
        {' '}
        Cancel{' '}
      </Button>
    </form>
  );
};

export default CreateRecipe;
