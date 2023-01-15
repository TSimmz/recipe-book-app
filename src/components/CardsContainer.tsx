import {
  Title,
  Divider,
  useMantineTheme,
  ScrollArea,
  Group,
  createStyles,
} from '@mantine/core';
import { CustomButton } from '@/components';
import { useSelector } from 'react-redux';
import {
  selectActiveRecipeBook,
  selectActiveRecipe,
  clearActiveRecipeBook,
  clearActiveRecipe,
  clearSelectedRecipe,
  selectSelectedRecipe,
} from '@/features/dashboard/dashboardSlice';
import { useAppDispatch } from '@/features/store';

const useStyles = createStyles((theme) => ({
  cardContainer: {
    borderRadius: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    margin: 0,
    marginLeft: '1rem',
    backgroundColor: theme.colors.dark[6],
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing.xl,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.md,
    margin: 0,
  },
}));

type CardsContainerProps = {
  title?: string;
  cards?: React.ReactNode;
};

const CardsContainer: React.FC<CardsContainerProps> = ({
  title,
  cards,
}: CardsContainerProps) => {
  const dispatch = useAppDispatch();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);
  const selectedRecipe = useSelector(selectSelectedRecipe);

  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleBackClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (selectedRecipe && !activeRecipe) {
      dispatch(clearSelectedRecipe());
      return dispatch(clearActiveRecipeBook());
    }

    if (activeRecipe) {
      dispatch(clearSelectedRecipe());
      return dispatch(clearActiveRecipe());
    }

    if (!activeRecipe && activeRecipeBook) {
      return dispatch(clearActiveRecipeBook());
    }
  };

  return (
    <div className={classes.cardContainer}>
      <Group position="apart" mb={theme.spacing.sm}>
        <Title fz={24} fw={'normal'} c={theme.white} ff={theme.fontFamily}>
          {title}
        </Title>
        {activeRecipeBook !== '' ? (
          <CustomButton label="Back" onClickHandler={handleBackClick} />
        ) : null}
      </Group>
      <Divider color={theme.white} size={2} />
      <ScrollArea.Autosize
        offsetScrollbars
        scrollHideDelay={150}
        mt={theme.spacing.md}
        maxHeight={'82vh'}
        style={{ width: '100%' }}
      >
        <div className={classes.cardGrid}>{cards}</div>
      </ScrollArea.Autosize>
    </div>
  );
};

export default CardsContainer;
