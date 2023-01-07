import {
  Tooltip,
  ActionIcon,
  useMantineTheme,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  tooltip: {},
  button: {
    color: theme.black,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',

    '&:hover': {
      color: theme.black,
      backgroundColor: 'transparent',
    },

    '&:hover::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      color: theme.black,
      backgroundColor: theme.colors.appOrange[7],
      opacity: 0.2,
    },

    '&:disabled': {
      borderColor: theme.colors.appOrange[4],
      backgroundColor: theme.colors.appOrange[4],
      color: theme.colors.gray[5],
    },
  },
}));

type TooltipPosition =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'top-start'
  | 'left-start'
  | 'bottom-start'
  | 'right-start'
  | 'top-end'
  | 'left-end'
  | 'bottom-end'
  | 'right-end';

type IconButtonProps = {
  label: string;
  tooltipPosition: TooltipPosition;
  icon: React.ReactNode;
  disabled?: boolean;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProps> = ({
  label,
  tooltipPosition,
  icon,
  disabled,
  handleClick,
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
    >
      <ActionIcon
        className={classes.button}
        color="dark"
        disabled={disabled}
        radius="md"
        onClick={handleClick}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default IconButton;
