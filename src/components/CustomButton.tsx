import { Button, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    fontFamily: theme.fontFamily,
    fontWeight: 'normal',
    fontSize: '16px',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: '22px',
    padding: `2px ${theme.spacing.md} `,
    cursor: 'pointer',
    color: theme.white,
    backgroundColor: theme.colors.dark[4],
    position: 'relative',
    transition: 'all ease-in-out 250ms',

    zIndex: 2,

    '&:hover': {
      backgroundColor: theme.colors.dark[3],
      transform: 'scale(1.05)',
      transition: 'all ease-in-out 250ms',
    },
  },

  buttonActive: {
    color: theme.black,
    backgroundColor: theme.colors.orange[3],

    '&:hover': {
      backgroundColor: theme.colors.orange[5],
      transform: 'scale(1.05)',
      transition: 'all ease-in-out 250ms',
    },
  },
}));

interface ICustomButton extends React.PropsWithChildren<any> {
  label: string;
  rightIcon?: React.ReactNode;
}

const CustomButton: React.FC<ICustomButton> = ({
  label,
  rightIcon,
  active,
  type,
  disabled,
  onClick,
}) => {
  const { classes, cx } = useStyles();

  return (
    <Button
      rightIcon={rightIcon}
      type={type}
      radius="xl"
      className={cx(classes.button, {
        [classes.buttonActive]: active === true,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
