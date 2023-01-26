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

    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   display: 'block',

    //   borderRadius: '32px',
    //   inset: 0,
    //   zIndex: -1,
    //   backgroundColor: theme.colors.dark[3],
    //   transform: 'scale(0)',
    //   transition: 'all ease-in-out 250ms',
    // },

    // '&:hover::before': {
    //   transform: 'scale(1)',
    // },
  },

  buttonActive: {
    color: theme.black,
    backgroundColor: theme.colors.orange[3],

    '&:hover': {
      backgroundColor: theme.colors.orange[5],
      transform: 'scale(1.05)',
      transition: 'all ease-in-out 250ms',
    },

    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   display: 'block',

    //   borderRadius: '32px',
    //   inset: 0,
    //   zIndex: -1,
    //   backgroundColor: theme.colors.orange[5],
    //   transform: 'scale(0)',
    //   transition: 'all ease-in-out 250ms',
    // },

    // '&:hover::before': {
    //   transform: 'scale(1)',
    // },
  },
}));

type CustomButtonProps = {
  label: string;
  active?: boolean;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  onClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  active,
  type,
  disabled,
  rightIcon,
  onClickHandler,
}: CustomButtonProps) => {
  const { classes, cx } = useStyles();

  return (
    <Button
      type={type}
      radius="xl"
      className={cx(classes.button, {
        [classes.buttonActive]: active === true,
      })}
      disabled={disabled}
      rightIcon={rightIcon}
      onClick={onClickHandler}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
