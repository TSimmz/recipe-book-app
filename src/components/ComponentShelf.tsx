import {
  useMantineTheme,
  createStyles,
  Group,
  Title,
  Divider,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  componentShelf: {
    minWidth: '100%',
    //minHeight: theme.other.minShelfHeight,
    borderRadius: theme.fontSizes.md,
    padding: `${theme.other.remSizing.md} ${theme.other.remSizing.lg}`,
    backgroundColor: theme.colors.dark[5],
  },
}));

interface IComponentShelf extends React.PropsWithChildren<any> {
  title: string;
  toolbar?: JSX.Element;
}

const ComponentShelf: React.FC<IComponentShelf> = ({
  title,
  toolbar,
  children,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <section className={classes.componentShelf}>
      <Group>
        <Title
          fz={theme.other.remSizing.md}
          c={theme.white}
          mb={theme.spacing.xs}
        >
          {title}
        </Title>
        {toolbar}
      </Group>
      <Divider color={theme.white} size={2} mb={theme.other.remSizing.md} />
      {children}
    </section>
  );
};

export default ComponentShelf;
