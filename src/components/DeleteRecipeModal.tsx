import { trpc } from '@/utils/trpc';
import { Loader, Modal, Flex, Text, Group, Button } from '@mantine/core';

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
  const deleteRecipe = trpc.useMutation(['recipe.deleteRecipe']);

  const handleYesClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    deleteRecipe.mutate({ id: activeRecipe });

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
