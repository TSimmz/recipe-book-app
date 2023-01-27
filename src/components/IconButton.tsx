import {
  Tooltip,
  ActionIcon,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { Position } from '@/utils/types';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.black,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    transition: 'all ease-in-out 150ms',

    '&:hover': {
      color: theme.black,
      backgroundColor: 'transparent',
      transform: 'scale(1.1)',
      transition: 'all ease-in-out 150ms',
    },

    '&:hover::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      color: theme.black,
      backgroundColor: theme.colors.orange[3],
      opacity: 0.2,
    },

    '&:disabled': {
      borderColor: theme.colors.appOrange[4],
      backgroundColor: theme.colors.appOrange[4],
      color: theme.colors.gray[5],
    },
  },
}));

interface IconButtonProps extends React.PropsWithChildren<any> {
  label: string;
  tooltipPosition: Position;
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  tooltipPosition,
  icon,
  disabled,
  onClick,
}: IconButtonProps) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Tooltip
      label={label}
      position={tooltipPosition}
      withArrow
      transition="fade"
      transitionDuration={250}
      c={theme.black}
      bg={theme.colors.orange[3]}
    >
      <ActionIcon
        className={classes.button}
        color="dark"
        disabled={disabled}
        radius="md"
        onClick={onClick}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default IconButton;
