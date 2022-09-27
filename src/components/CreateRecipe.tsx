import { trpc } from '@/utils/trpc';
import { Button, TextInput, Textarea, NumberInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import { z } from 'zod';

const createRecipeSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should have at least 3 characters' }),
  description: z.string(),
  hours: z.number().min(0),
  minutes: z.number().min(0).max(59),
  numberOfServings: z.number().min(1),
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
    },
  });

  //const recipeMutation = trpc.useMutation(('recipe.createRecipe'));

  const handleSubmit = (values: typeof form.values) => {
    // Create the recipe
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
        required
        {...form.getInputProps('hours')}
      />
      <NumberInput
        label="Minutes"
        stepHoldDelay={500}
        stepHoldInterval={100}
        required
        {...form.getInputProps('minutes')}
      />
      <NumberInput
        label="Number of Servings"
        stepHoldDelay={500}
        stepHoldInterval={100}
        required
        {...form.getInputProps('numberOfServings')}
      />

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
