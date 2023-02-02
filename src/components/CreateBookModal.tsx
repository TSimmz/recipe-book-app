import { trpc } from '@/utils/trpc';
import {
  TextInput,
  Textarea,
  Stack,
  Group,
  Modal,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { CustomButton } from '@/components';

const createBookSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should have at least 3 characters' }),
  description: z.string(),
});

interface ICreateBookModal extends React.PropsWithChildren<any> {
  userId: string;
  modalState: boolean;
  closeModal: () => void;
  fetchBooks: () => void;
}

const CreateBookModal: React.FC<ICreateBookModal> = ({
  userId,
  modalState,
  closeModal,
  fetchBooks,
}) => {
  const theme = useMantineTheme();

  const createBook = trpc.useMutation(['book.createBook'], {
    onSuccess: () => {
      fetchBooks();
    },
  });

  // Form set up
  const form = useForm({
    validate: zodResolver(createBookSchema),
    initialValues: { title: '', description: '' },
  });

  // Submit
  const handleSubmit = (values: typeof form.values) => {
    // Create a recipe book
    createBook.mutate({ userId, ...values });

    // Close modal
    closeModal();
  };

  return (
    <Modal
      title="Create a New Recipe Book"
      opened={modalState}
      radius={18}
      centered
      onClose={() => closeModal()}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder="Enter a title..."
            label="Book Title"
            required
            {...form.getInputProps('title')}
          />
          <Textarea
            placeholder="Enter a description..."
            label="Description"
            required
            autosize
            maxRows={10}
            {...form.getInputProps('description')}
          />
          <Group mt={theme.spacing.xl} position="apart">
            <CustomButton type="submit" label="Save New Book" active />
            <CustomButton label="Cancel" active onClick={() => closeModal()} />
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateBookModal;
