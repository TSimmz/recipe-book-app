import { createStyles, Card, Image, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    transform: 'scale(1)',
    transition: 'all ease-in-out 150ms',

    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'all ease-in-out 150ms',
    },
  },
  cardActive: {
    border: `4px solid ${theme.colors.orange[3]}`,
  },
}));

type CustomCardProps = {
  bookId: string;
  active: boolean;
  onClickHandler: (bookId: string) => void;
  image: React.ReactNode;
  body: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({
  bookId,
  active,
  onClickHandler,
  image,
  body,
}: CustomCardProps) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  return (
    <Card
      h={300}
      radius={24}
      c={theme.white}
      bg={theme.colors.dark[7]}
      onClick={() => onClickHandler(bookId)}
      className={cx(classes.card, { [classes.cardActive]: active === true })}
    >
      <Card.Section>{image}</Card.Section>

      <Card.Section p={theme.spacing.md}>{body}</Card.Section>
    </Card>
  );
};

export default CustomCard;
