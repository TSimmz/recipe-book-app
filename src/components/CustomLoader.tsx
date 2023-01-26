import { createStyles, useMantineTheme, Loader } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  loaderContainer: {
    display: 'flex',
    width: '100%',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.dark[4],
    opacity: 0.5,
  },
}));

interface ICustomLoader extends React.PropsWithChildren<any> {}

const CustomLoader: React.FC<ICustomLoader> = ({}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.loaderContainer}>
      <Loader color={theme.colors.orange[3]} />
    </div>
  );
};

export default CustomLoader;
