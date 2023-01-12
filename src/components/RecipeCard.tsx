import {
  Stack,
  Title,
  Text,
  Image,
  Group,
  useMantineTheme,
  Divider,
} from '@mantine/core';
import { CustomCard } from '@/components';

type RecipeCardProps = {
  bookId: string;
  active: boolean;
  onClickHandler: (bookId: string) => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  bookId,
  active,
  onClickHandler,
}: RecipeCardProps) => {
  const theme = useMantineTheme();

  return (
    <CustomCard
      bookId={bookId}
      active={active}
      onClickHandler={onClickHandler}
      image={
        <Image
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
          height={110}
          alt="Recipe"
        />
      }
      body={
        <Stack align="flex-start" spacing="xs">
          <Title order={1} fw="normal" fz={16} ff={theme.fontFamily} underline>
            The Best Lasagna
          </Title>
          <Group position="apart" w="100%">
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {'Prep Time: 1h 25m'}
            </Text>
            <Text fz={12} italic c={theme.colors.orange[3]}>
              {'Cook Time: 1h 25m'}
            </Text>
          </Group>
          <Text fz={12} italic lineClamp={3}>
            {'This is a big long description of this recipe. Its so dang good!'}
          </Text>
          <Divider color={theme.white} size={2} />
          {/** TODO: Recipe tags will go here */}
        </Stack>
      }
    />
  );
};

export default RecipeCard;
