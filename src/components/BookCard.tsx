import {
  Card,
  Text,
  Image,
  useMantineTheme,
  createStyles,
  Stack,
} from '@mantine/core';

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
interface IBookCard extends React.PropsWithChildren<any> {
  title: string;
  image?: string;
}

const BookCard: React.FC<IBookCard> = ({ title, image }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const placeholderImage =
    'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80';

  return (
    <Card radius={'md'} w={'180px'} mih={'200px'} className={classes.card}>
      <Stack justify={'space-between'}>
        <Text truncate>{title}</Text>
        <Image src={image || placeholderImage} alt="Book image" radius={'md'} />
      </Stack>
    </Card>
  );
};

export default BookCard;
