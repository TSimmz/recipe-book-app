import { trpc } from '@/utils/trpc';
import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const createRecipeBookSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should have at least 3 characters' }),
  description: z.string(),
});

type CreateRecipeBookProps = {
  userId: string;
  setOpenCreateRecipeBook: React.Dispatch<React.SetStateAction<boolean>>;
  recipeBookMutation: any;
};

const CreateRecipeBook: React.FC<CreateRecipeBookProps> = ({
  userId,
  setOpenCreateRecipeBook,
  recipeBookMutation,
}: CreateRecipeBookProps) => {
  // Form set up
  const form = useForm({
    validate: zodResolver(createRecipeBookSchema),
    initialValues: { title: '', description: '' },
  });

  // Submit
  const handleSubmit = (values: typeof form.values) => {
    // Create a recipe book
    const title = values.title;
    const description = values.description;

    const create = recipeBookMutation.mutate({ userId, title, description });

    // Close modal
    setOpenCreateRecipeBook(false);
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
      <Button
        color="yellow"
        radius="md"
        size="md"
        onClick={() => {
          setOpenCreateRecipeBook(false);
        }}
      >
        {' '}
        Cancel{' '}
      </Button>
    </form>
  );
};

export default CreateRecipeBook;
