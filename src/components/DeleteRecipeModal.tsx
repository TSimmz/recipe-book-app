import { trpc } from '@/utils/trpc';
import { clearActiveRecipe } from '@/features/dashboard/dashboardSlice';
import { Modal, Stack, Text, Group, useMantineTheme } from '@mantine/core';
import { useAppDispatch } from '@/features/store';
import CustomButton from './CustomButton';

type DeleteRecipeModalProps = {
  activeRecipe: string;
  isDeleteRecipeModalOpened: boolean;
  setDeleteRecipeModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({
  activeRecipe,
  isDeleteRecipeModalOpened,
  setDeleteRecipeModalOpened,
}: DeleteRecipeModalProps) => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const deleteRecipe = trpc.useMutation(['recipe.deleteRecipe'], {
    onSuccess: () => {},
  });

  const handleYesClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    deleteRecipe.mutate({ id: activeRecipe });

    dispatch(clearActiveRecipe());

    setDeleteRecipeModalOpened(false);
  };

  const handleNoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setDeleteRecipeModalOpened(false);
  };

  return (
    <Modal
      centered
      size="sm"
      title="Delete Recipe"
      opened={isDeleteRecipeModalOpened}
      onClose={() => setDeleteRecipeModalOpened(false)}
    >
      <Stack align={'center'}>
        <Text size={18} mb="lg">
          Are you sure?
        </Text>
        <Group position="apart" style={{ gap: theme.spacing.xl }}>
          <CustomButton label="Yes" active onClickHandler={handleYesClick} />
          <CustomButton label="No" active onClickHandler={handleNoClick} />
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteRecipeModal;
