import {
  Title,
  Text,
  Group,
  Stack,
  createStyles,
  Card,
  Image,
  useMantineTheme,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
  },
  cardActive: {
    border: `4px solid ${theme.colors.orange[3]}`,
  },
}));

type RecipeBookCardProps = {
  active?: boolean;
};

const RecipeBookCard: React.FC<RecipeBookCardProps> = ({
  active,
}: RecipeBookCardProps) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Card
      h={300}
      w={220}
      radius={24}
      c={theme.white}
      bg={theme.colors.dark[6]}
      onClick={() => alert('YOU CLICKED ME')}
      className={cx(classes.card, { [classes.cardActive]: active === true })}
    >
      <Card.Section>
        {' '}
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={110}
          alt="Norway"
        />
      </Card.Section>
      <Card.Section p={theme.spacing.md}>
        <Stack align="flex-start" spacing="xs">
          <Title
            order={1}
            fw="normal"
            fz={16}
            ff={theme.fontFamily}
            mb={theme.spacing.sm}
            td="underline"
          >
            Tyler Simoni
          </Title>
          <Text fz={12} fs="italic" mb={theme.spacing.sm} lineClamp={4}>
            {
              '“The best recipes from dear, old Grangran’s cooking days. These are rich, delicious, delectible and will never leave you disappointed. Dive in for more...'
            }
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default RecipeBookCard;
