import { createStyles, useMantineTheme, Loader } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  loaderContainer: {
    display: 'flex',
    width: '100%',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
  },
}));

type CustomLoaderProps = {};

const CustomLoader: React.FC<CustomLoaderProps> = ({}: CustomLoaderProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.loaderContainer}>
      <Loader color={theme.colors.orange[3]} />
    </div>
  );
};

export default CustomLoader;
