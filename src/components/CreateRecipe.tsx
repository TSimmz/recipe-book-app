import { trpc } from '@/utils/trpc';
import { Button, TextInput, Textarea, NumberInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import { z } from 'zod';
import { IconCirclePlus } from '@tabler/icons';

const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  hours: z.number().min(0),
  minutes: z.number().min(0).max(59),
  numberOfServings: z.number().min(1),
  ingredients: z
    .object({
      name: z.string(),
      value: z.number(),
      unit: z.string(),
    })
    .array()
    .min(1)
    .optional(),
  steps: z
    .object({
      description: z.string(),
      notes: z.string(),
    })
    .array()
    .min(1)
    .optional(),
});

interface CreateRecipeProps {
  recipeBookId: string;
  setOpenCreateRecipe: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({
  recipeBookId,
  setOpenCreateRecipe,
}) => {
  const form = useForm({
    validate: zodResolver(createRecipeSchema),
    initialValues: {
      title: '',
      description: '',
      hours: 0,
      minutes: 0,
      numberOfServings: 1,
      ingredients: [],
      steps: [],
    },
  });

  //const recipeMutation = trpc.useMutation(('recipe.createRecipe'));

  const handleAddIngredient = () => {};

  const handleAddStep = () => {};

  const handleSubmit = (values: typeof form.values) => {
    // Create the recipe
    console.log('Recipe Values: ', values);

    // Close the modal
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
        {...form.getInputProps('hours')}
      />
      <NumberInput
        label="Minutes"
        stepHoldDelay={500}
        stepHoldInterval={100}
        required
        min={0}
        max={59}
        {...form.getInputProps('minutes')}
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
