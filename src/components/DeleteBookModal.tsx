import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { clearActiveRecipe } from '@/features/dashboard/dashboardSlice';
import {
  Modal,
  Stack,
  Text,
  Group,
  useMantineTheme,
  Highlight,
  TextInput,
  Space,
  createStyles,
} from '@mantine/core';
import { useAppDispatch } from '@/features/store';
import CustomButton from './CustomButton';

const useStyles = createStyles((theme) => ({
  deleteBookModal: {
    '.mantine-Modal-title': {
      color: theme.colors.red[5],
    },
  },
}));

type DeleteBookModalProps = {
  activeBook: string;
  bookTitle: string;
  isDeleteBookModalOpened: boolean;
  setDeleteBookModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  activeBook,
  bookTitle,
  isDeleteBookModalOpened,
  setDeleteBookModalOpened,
}: DeleteBookModalProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [deleteBookTitleText, setDeleteBookTitleText] = useState('');

  const deleteBook = trpc.useMutation(['recipebook.deleteBook'], {
    onSuccess: () => {},
  });

  const handleYesClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    deleteBook.mutate({ id: activeBook });

    dispatch(clearActiveRecipe());

    setDeleteBookModalOpened(false);
  };

  const handleNoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDeleteBookModalOpened(false);
  };

  return (
    <Modal
      centered
      size="md"
      radius={'lg'}
      title={`Are you absolutely sure?`}
      opened={isDeleteBookModalOpened}
      className={classes.deleteBookModal}
      onClose={() => {
        setDeleteBookTitleText('');
        setDeleteBookModalOpened(false);
      }}
    >
      <Stack align={'flex-start'}>
        <Text>
          This action cannot be undone. This will permanently delete this book
          and all containing recipes.
        </Text>
        <Space h="xs" />
        <Highlight
          size={14}
          highlight={[`${bookTitle}`]}
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(
              0,
              theme.colors.orange[3],
              theme.colors.orange[7],
            ),
            fontWeight: 700,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          {`Please type ${bookTitle} to confirm.`}
        </Highlight>
        <TextInput
          mt={-theme.spacing.sm}
          w="100%"
          value={deleteBookTitleText}
          error={deleteBookTitleText !== bookTitle}
          onChange={(event) =>
            setDeleteBookTitleText(event.currentTarget.value)
          }
        />

        <Group style={{ alignSelf: 'center' }}>
          <CustomButton
            label="Delete this recipe book"
            active
            disabled={deleteBookTitleText !== bookTitle}
            onClickHandler={handleYesClick}
          />
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteBookModal;
