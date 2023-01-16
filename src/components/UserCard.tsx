import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import {
  Title,
  Text,
  Group,
  Stack,
  createStyles,
  Card,
  Image,
  useMantineTheme,
  Avatar,
} from '@mantine/core';
import { useRouter } from 'next/router';
import {
  IconButton,
  CreateRecipeBookModal,
  CreateRecipeModal,
  CustomLoader,
} from '@/components';
import { selectActiveRecipeBook } from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';
import { IconCirclePlus } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  bioBorder: {
    padding: '8px',
    borderBottom: `1px solid ${theme.white}`,
  },
}));

type UserCardProps = {
  userId: string;
};

const UserCard: React.FC<UserCardProps> = ({ userId }: UserCardProps) => {
  const router = useRouter();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);

  const user = trpc.useQuery(['user.getUserById', { id: userId }]);

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  const handleOpenRecipeBookModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setOpenCreateRecipeBook(true);
  };

  const handleOpenRecipeModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setOpenCreateRecipe(true);
  };

  if (user.status === 'loading')
    return (
      <Card radius={24} c={theme.white} bg={theme.colors.dark[6]}>
        <CustomLoader />
      </Card>
    );

  return (
    <Card radius={24} c={theme.white} bg={theme.colors.dark[6]}>
      <Card.Section>
        {' '}
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={120}
          alt="Norway"
        />
      </Card.Section>
      <Card.Section px={30} pb={16}>
        <Stack align="center" spacing="xs">
          <Avatar
            size={62}
            mt={-31}
            mb={theme.spacing.md}
            bg={theme.colors.dark[3]}
            radius="xl"
          ></Avatar>
          <Title order={1} fw="normal" fz={20} ff={theme.fontFamily}>
            Tyler Simoni
          </Title>
          <Title
            order={2}
            fw="normal"
            fz={16}
            mb={theme.spacing.sm}
            c={theme.colors.orange[3]}
            ff={theme.fontFamily}
          >
            @TSimmz
          </Title>
          <Text
            fz={14}
            fs="italic"
            ta={'center'}
            pb={theme.spacing.md}
            mb={theme.spacing.sm}
            className={classes.bioBorder}
          >
            {'"Cooking is my passion. Come along for my culinary journey."'}
          </Text>{' '}
          <Group position="center" style={{ gap: theme.spacing.xl }} w="100%">
            <Group>
              <Stack align="center">
                <Text>12</Text>
                <Text fz={14} c={theme.colors.orange[3]} mt={-theme.spacing.md}>
                  Books
                </Text>
              </Stack>
              {router.pathname === '/my-shelf' ? (
                <IconButton
                  label="Create Book"
                  tooltipPosition="top"
                  icon={<IconCirclePlus color={theme.colors.orange[4]} />}
                  handleClick={handleOpenRecipeBookModal}
                />
              ) : null}
            </Group>
            <Group>
              <Stack align="center">
                <Text>124</Text>
                <Text fz={14} c={theme.colors.orange[3]} mt={-theme.spacing.md}>
                  Recipes
                </Text>
              </Stack>
              {router.pathname === '/my-shelf' && activeRecipeBook !== '' ? (
                <IconButton
                  label="Create Recipe"
                  tooltipPosition="top"
                  icon={<IconCirclePlus color={theme.colors.orange[4]} />}
                  handleClick={handleOpenRecipeModal}
                />
              ) : null}
            </Group>
          </Group>
        </Stack>
      </Card.Section>
      {router.pathname === '/my-shelf' ? (
        <>
          <CreateRecipeBookModal
            userId={userId}
            modalState={openCreateRecipeBook}
            closeModal={() => setOpenCreateRecipeBook(false)}
          />
          <CreateRecipeModal
            bookId={activeRecipeBook}
            modalState={openCreateRecipe}
            closeModal={() => setOpenCreateRecipe(false)}
          />
        </>
      ) : null}
    </Card>
  );
};

export default UserCard;
