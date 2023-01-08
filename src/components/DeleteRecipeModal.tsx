import { trpc } from '@/utils/trpc';
import { useSelector } from 'react-redux';
import { clearActiveRecipe } from '@/features/dashboard/dashboardSlice';
import { Modal, Flex, Text, Group, Button } from '@mantine/core';
import { useAppDispatch } from '@/features/store';

type DeleteRecipeModalProps = {
  activeRecipe: string;
  recipes: any;
  isDeleteRecipeModalOpened: boolean;
  setDeleteRecipeModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({
  activeRecipe,
  recipes,
  isDeleteRecipeModalOpened,
  setDeleteRecipeModalOpened,
}: DeleteRecipeModalProps) => {
  const dispatch = useAppDispatch();

  const deleteRecipe = trpc.useMutation(['recipe.deleteRecipe'], {
    onSuccess: () => {
      recipes?.refetch();
    },
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
      <Flex w={'100%'} direction="column" justify="center" align="center">
        <Text size={18} mb="lg">
          Are you sure?
        </Text>
        <Group position="apart">
          <Button
            color="yellow"
            radius="md"
            w={100}
            h={40}
            onClick={handleYesClick}
          >
            Yes
          </Button>
          <Button
            color="yellow"
            radius="md"
            w={100}
            h={40}
            onClick={handleNoClick}
          >
            No
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
};

export default DeleteRecipeModal;
