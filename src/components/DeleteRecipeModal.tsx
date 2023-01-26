import { trpc } from '@/utils/trpc';
import { clearActiveRecipe } from '@/features/dashboard/dashboardSlice';
import { Modal, Stack, Text, Group, useMantineTheme } from '@mantine/core';
import { useAppDispatch } from '@/features/store';
import CustomButton from './CustomButton';

interface IDeleteRecipeModal extends React.PropsWithChildren<any> {
  activeRecipe: string;
  recipeTitle: string;
  isDeleteRecipeModalOpened: boolean;
  setDeleteRecipeModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteRecipeModal: React.FC<IDeleteRecipeModal> = ({
  activeRecipe,
  recipeTitle,
  isDeleteRecipeModalOpened,
  setDeleteRecipeModalOpened,
}) => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const deleteRecipe = trpc.useMutation(['recipe.deleteRecipe'], {
    onSuccess: () => {},
  });

  const handleYesClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    deleteRecipe.mutate({ id: activeRecipe });

    dispatch(clearActiveRecipe());

    setDeleteRecipeModalOpened(false);
  };

  const handleNoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDeleteRecipeModalOpened(false);
  };

  return (
    <Modal
      centered
      size="sm"
      radius={'lg'}
      title={`Delete ${recipeTitle}`}
      opened={isDeleteRecipeModalOpened}
      onClose={() => setDeleteRecipeModalOpened(false)}
    >
      <Stack align={'center'}>
        <Text size={16} mb="lg" ta={'center'}>
          {`Are you sure?`}
        </Text>
        <Group position="apart" style={{ gap: theme.spacing.xl }}>
          <CustomButton label="Yes" active onClick={handleYesClick} />
          <CustomButton label="No" active onClick={handleNoClick} />
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteRecipeModal;
