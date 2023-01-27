import { createStyles, Card, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    transition: 'all ease-in-out 150ms',

    '&:hover': {
      transform: 'scale(1.01)',
      transition: 'all ease-in-out 150ms',
    },
  },
  cardActive: {
    border: `4px solid ${theme.colors.orange[3]}`,
  },
}));

interface ICustomCard extends React.PropsWithChildren<any> {
  active: boolean;
  image: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const CustomCard: React.FC<ICustomCard> = ({
  active,
  image,
  body,
  footer,
  onClick,
}) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  return (
    <Card
      h={300}
      radius={24}
      c={theme.white}
      bg={theme.colors.dark[7]}
      onClick={onClick}
      className={cx(classes.card, { [classes.cardActive]: active === true })}
    >
      <Card.Section>{image}</Card.Section>

      <Card.Section p={theme.spacing.md}>{body}</Card.Section>
      <Card.Section
        h={30}
        pos="absolute"
        bottom={theme.spacing.lg}
        right={theme.spacing.xl}
      >
        {footer}
      </Card.Section>
    </Card>
  );
};

export default CustomCard;
