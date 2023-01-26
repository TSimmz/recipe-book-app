import { useState } from 'react';
import {
  Title,
  Divider,
  useMantineTheme,
  ScrollArea,
  Group,
  createStyles,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { CustomButton, CreateBookModal, CreateRecipeModal } from '@/components';
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
import { IconCirclePlus } from '@tabler/icons';

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);
  const selectedRecipe = useSelector(selectSelectedRecipe);

  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  const { classes } = useStyles();
  const theme = useMantineTheme();

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

  const renderCreateBookButton = () => {
    if (router.pathname === '/my-shelf' && activeRecipeBook === '')
      return (
        <>
          <CustomButton
            active
            label="Add New Book"
            rightIcon={<IconCirclePlus color={theme.black} />}
            onClick={handleOpenRecipeBookModal}
          />
          <CreateBookModal
            userId={''}
            modalState={openCreateRecipeBook}
            closeModal={() => setOpenCreateRecipeBook(false)}
          />
        </>
      );
  };

  const renderCreateRecipeButton = () => {
    if (
      router.pathname === '/my-shelf' &&
      activeRecipeBook !== '' &&
      activeRecipe === ''
    )
      return (
        <>
          <CustomButton
            active
            label="Add New Recipe"
            rightIcon={<IconCirclePlus color={theme.black} />}
            onClick={handleOpenRecipeModal}
          />
          <CreateRecipeModal
            bookId={activeRecipeBook}
            modalState={openCreateRecipe}
            closeModal={() => setOpenCreateRecipe(false)}
          />
        </>
      );
  };

  return (
    <div className={classes.cardContainer}>
      <Group position="apart" mb={theme.spacing.sm}>
        <Title fz={24} fw={'normal'} c={theme.white} ff={theme.fontFamily}>
          {title}
        </Title>
        <Group>
          {renderCreateBookButton()}
          {renderCreateRecipeButton()}
          {activeRecipeBook !== '' ? (
            <CustomButton label="Back" onClick={handleBackClick} />
          ) : null}
        </Group>
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
