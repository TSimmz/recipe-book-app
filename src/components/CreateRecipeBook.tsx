import React from 'react';
import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { trpc } from '@/utils/trpc';
import { z } from 'zod';
import { useSession } from 'next-auth/react';

const createRecipeBookSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should have at least 3 characters' }),
  description: z.string(),
});

interface CreateRecipeBookProps {
  setOpenCreateRecipeBook: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRecipeBook: React.FC<CreateRecipeBookProps> = ({
  setOpenCreateRecipeBook,
}) => {
  const { data: session } = useSession();
  const form = useForm({
    validate: zodResolver(createRecipeBookSchema),
    initialValues: { title: '', description: '' },
  });

  const recipeBookMutation = trpc.useMutation(['recipebook.createRecipeBook']);

  console.log(session);

  // const handleError = (errors: typeof form.errors) => {
  //   console.log('Errors', errors);
  // };

  const handleSubmit = (values: typeof form.values) => {
    // Create a recipe book
    //const create = recipeBookMutation.mutate({});

    // Close modal

    console.log('Values: ', values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        placeholder="Recipe Book Name"
        label="Recipe Book Name"
        required
        {...form.getInputProps('title')}
      />
      <Textarea
        placeholder="Description"
        label="Description"
        required
        {...form.getInputProps('description')}
      />
      <Button type="submit" color="yellow" radius="md" size="md">
        Save Recipe Book
      </Button>
    </form>
  );
};

export default CreateRecipeBook;
