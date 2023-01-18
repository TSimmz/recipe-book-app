import {
  Stack,
  Title,
  Text,
  Image,
  Group,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { CustomCard, IconButton } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  setSelectedRecipeBook,
  setSelectAndActiveRecipeBook,
} from '@/features/dashboard/dashboardSlice';
import { IconTrash, IconArrowUpRightCircle } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  image: {
    position: 'relative',

    '&::before': {
      position: 'absolute',
      content: '""',
      display: 'block',
      inset: 0,
      border: 'none',
      background: `linear-gradient(180deg, transparent, ${theme.colors.dark[7]})`,
      opacity: '90%',
      zIndex: 1,
    },
  },
}));

type RecipeBookCardProps = {
  bookId: string;
  active: boolean;
  recipeBook: any;
};

const RecipeBookCard: React.FC<RecipeBookCardProps> = ({
  bookId,
  active,
  recipeBook,
}: RecipeBookCardProps) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(setSelectedRecipeBook(bookId));
  };

  const handleOpenBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setSelectAndActiveRecipeBook(bookId));
  };

  return (
    <CustomCard
      active={active}
      onClickHandler={handleCardClick}
      image={
        <Image
          className={classes.image}
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
            {recipeBook.title}
          </Title>
          <Text fz={12} italic mb={theme.spacing.sm} lineClamp={4}>
            {recipeBook.description}
          </Text>
        </Stack>
      }
      footer={
        <Group style={{ gap: theme.spacing.xs }}>
          <IconButton
            label="Open Book"
            tooltipPosition={'top'}
            icon={
              <IconArrowUpRightCircle
                color={theme.colors.orange[3]}
                size={20}
              />
            }
            handleClick={handleOpenBook}
          />
        </Group>
      }
    />
  );
};

export default RecipeBookCard;
