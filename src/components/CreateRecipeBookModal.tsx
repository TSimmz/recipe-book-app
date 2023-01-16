import { trpc } from '@/utils/trpc';
import {
  TextInput,
  Textarea,
  createStyles,
  Stack,
  Group,
  Modal,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { CustomButton } from '@/components';

const useStyles = createStyles((theme) => ({
  form: {
    '& .mantine-TextInput-label, .mantine-Textarea-label': {
      marginBottom: theme.spacing.xs,
    },

    '& .mantine-TextInput-required, .mantine-Textarea-required': {
      color: theme.colors.orange[3],
    },
  },
}));

const createRecipeBookSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should have at least 3 characters' }),
  description: z.string(),
});

type CreateRecipeBookModalProps = {
  userId: string;
  modalState: boolean;
  closeModal: () => void;
};

const CreateRecipeBookModal: React.FC<CreateRecipeBookModalProps> = ({
  userId,
  modalState,
  closeModal,
}: CreateRecipeBookModalProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

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
    <Modal
      title="Create a New Recipe Book"
      opened={modalState}
      radius={18}
      centered
      onClose={() => closeModal()}
      size="md"
    >
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
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
            <CustomButton
              label="Cancel"
              active
              onClickHandler={() => closeModal()}
            />
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateRecipeBookModal;
