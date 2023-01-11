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

const useStyles = createStyles((theme) => ({
  bioBorder: {
    padding: '8px',
    borderBottom: `1px solid ${theme.white}`,
  },
}));

type UserCardProps = {};

const UserCard: React.FC<UserCardProps> = ({}: UserCardProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
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
          <Title order={1} fw="normal" fz={20}>
            Tyler Simoni
          </Title>
          <Title
            order={2}
            fw="normal"
            fz={16}
            mb={theme.spacing.sm}
            c={theme.colors.orange[3]}
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
          <Group position="center" w="100%">
            <Stack align="center">
              <Text>12</Text>
              <Text fz={14} c={theme.colors.orange[3]} mt={-theme.spacing.md}>
                Books
              </Text>
            </Stack>
            <Stack align="center">
              <Text>124</Text>
              <Text fz={14} c={theme.colors.orange[3]} mt={-theme.spacing.md}>
                Recipes
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default UserCard;
