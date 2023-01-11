import { Stack, Title, Text, Image, useMantineTheme } from '@mantine/core';
import { CustomCard } from '@/components';

type RecipeBookCardProps = {
  bookId: string;
  active: boolean;
  onClickHandler: (bookId: string) => void;
};

const RecipeBookCard: React.FC<RecipeBookCardProps> = ({
  bookId,
  active,
  onClickHandler,
}: RecipeBookCardProps) => {
  const theme = useMantineTheme();

  return (
    <CustomCard
      bookId={bookId}
      active={active}
      onClickHandler={onClickHandler}
      image={
        <Image
          src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80"
          height={110}
          alt="Recipe Book"
        />
      }
      body={
        <Stack align="flex-start" spacing="xs">
          <Title
            order={1}
            fw="normal"
            fz={16}
            ff={theme.fontFamily}
            mb={theme.spacing.sm}
            underline
          >
            Grandma Recipes
          </Title>
          <Text fz={12} italic mb={theme.spacing.sm} lineClamp={4}>
            {
              '“The best recipes from dear, old Grangran’s cooking days. These are rich, delicious, delectible and will never leave you disappointed. Dive in for more...'
            }
          </Text>
        </Stack>
      }
    />
  );
};

export default RecipeBookCard;
