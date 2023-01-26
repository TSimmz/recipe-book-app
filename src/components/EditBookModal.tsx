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
import { useEffect, useRef } from 'react';
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

const editRecipeBookSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title should have at least 3 characters' }),
  description: z.string(),
});

interface IEditBookModal extends React.PropsWithChildren<any> {
  bookId: string;
  bookData: any;
  modalState: boolean;
  closeModal: () => void;
}

const EditRecipeBookModal: React.FC<IEditBookModal> = ({
  bookId,
  bookData,
  modalState,
  closeModal,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const editBookMutation = trpc.useMutation(['recipebook.editBook'], {
    onSuccess: () => {},
  });

  // Form set up
  const editForm = useForm({
    validate: zodResolver(editRecipeBookSchema),
    initialValues: { title: '', description: '' },
  });

  //== Feels a little janky =====
  let initialDataSet = useRef(false);
  useEffect(() => {
    editForm.setValues(bookData);
    initialDataSet.current = true;
  }, []);

  useEffect(() => {
    editForm.resetDirty();
  }, [initialDataSet.current]);
  //=============================

  // Submit
  const handleSubmit = (values: typeof editForm.values) => {
    // Create a recipe book
    editBookMutation.mutate({ id: bookId, ...values });

    // Close modal
    closeModal();
  };

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <Modal
      title="Edit Recipe Book"
      opened={modalState}
      radius={18}
      centered
      onClose={() => closeModal()}
      size="md"
    >
      <form className={classes.form} onSubmit={editForm.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder="Enter a title..."
            label="Book Title"
            required
            {...editForm.getInputProps('title')}
          />
          <Textarea
            placeholder="Enter a description..."
            label="Description"
            required
            autosize
            maxRows={10}
            {...editForm.getInputProps('description')}
          />
          <Group mt={theme.spacing.xl} position="apart">
            <CustomButton
              type="submit"
              disabled={!editForm.isDirty()}
              label="Save New Book"
              active
            />
            <CustomButton label="Cancel" active onClick={handleCancelClick} />
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditRecipeBookModal;
