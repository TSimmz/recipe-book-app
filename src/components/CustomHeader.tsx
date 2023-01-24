import {
  Header,
  Group,
  Title,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { AvatarMenu, CustomButton, CustomNavLink } from '@/components';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  headerTitle: {
    cursor: 'pointer',
    fontSize: '32px',
    fontWeight: 'normal',
    transition: 'all ease-in-out 150ms',

    '&:hover': {
      scale: '1.02',
      color: theme.colors.orange[3],
      transition: 'all ease-in-out 150ms',
    },
  },
}));

type CustomHeaderProps = {
  session: any;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  session,
}: CustomHeaderProps) => {
  const router = useRouter();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleSignInClick = () => {
    signIn(undefined, {
      callbackUrl: '/',
    });
  };

  return (
    <Header
      height={60}
      py={theme.spacing.sm}
      px={theme.spacing.lg}
      bg={theme.colors.dark[9]}
      style={{ borderColor: theme.colors.dark[9] }}
    >
      <Group position="apart">
        <Link href="/">
          <Title className={classes.headerTitle}>Recipe Book</Title>
        </Link>
        {!session ? (
          <CustomButton
            label="Sign In"
            active
            onClickHandler={handleSignInClick}
          />
        ) : (
          <Group position="right">
            <CustomNavLink
              label="Browse"
              linkTo="/browse"
              disabled
              active={router.pathname === '/browse'}
            />
            <CustomNavLink
              label="My Shelf"
              linkTo="/my-shelf"
              active={router.pathname === '/my-shelf'}
            />
            <CustomNavLink
              label="My Pantry"
              linkTo="/my-pantry"
              active={router.pathname === '/my-pantry'}
            />
            <AvatarMenu menuPosition="bottom-end" />
          </Group>
        )}
      </Group>
    </Header>
  );
};

export default CustomHeader;
