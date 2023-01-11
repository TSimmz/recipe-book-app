import {
  Title,
  Divider,
  useMantineTheme,
  ScrollArea,
  createStyles,
} from '@mantine/core';
import { RecipeBookCard } from '@/components';

const useStyles = createStyles((theme) => ({
  cardContainer: {
    borderRadius: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    margin: 0,
    marginLeft: '2rem',
    backgroundColor: theme.colors.dark[6],
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <div className={classes.cardContainer}>
      <Title
        fz={24}
        fw={'normal'}
        c={theme.white}
        ff={theme.fontFamily}
        mb={theme.spacing.sm}
      >
        {title || 'My Books'}
      </Title>
      <Divider color={theme.white} size={2} />
      <ScrollArea.Autosize
        offsetScrollbars
        scrollHideDelay={150}
        mt={theme.spacing.md}
        maxHeight={1000}
        style={{ width: '100%' }}
      >
        <div className={classes.cardGrid}>
          <RecipeBookCard active />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard active />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
          <RecipeBookCard />
        </div>
      </ScrollArea.Autosize>
    </div>
  );
};

export default CardsContainer;
