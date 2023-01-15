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
  closeModal: () => void;
};

const CreateRecipeBook: React.FC<CreateRecipeBookProps> = ({
  userId,
  closeModal,
}: CreateRecipeBookProps) => {
  const createRecipeBook = trpc.useMutation(['recipebook.createRecipeBook'], {
    onSuccess: () => {},
  });

  // Form set up
  const form = useForm({
    validate: zodResolver(createRecipeBookSchema),
    initialValues: { title: '', description: '' },
  });

  // Submit
  const handleSubmit = (values: typeof form.values) => {
    // Create a recipe book
    createRecipeBook.mutate({ userId, ...values });

    // Close modal
    closeModal();
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
      <Button color="yellow" radius="md" size="md" onClick={() => closeModal()}>
        {' '}
        Cancel{' '}
      </Button>
    </form>
  );
};

export default CreateRecipeBook;
