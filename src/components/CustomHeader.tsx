import {
  Header,
  Group,
  TextInput,
  useMantineTheme,
  createStyles,
  Avatar,
} from '@mantine/core';
import { AvatarMenu, CustomButton } from '@/components';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { IconSearch } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  header: {
    background: theme.colors.dark[9],
    borderColor: theme.colors.dark[9],
    display: 'flex',
    alignItems: 'center',
  },
  headerLogo: {
    cursor: 'pointer',
    fontSize: '32px',
    fontWeight: 'normal',
    transition: 'all ease-in-out 200ms',

    '&:hover': {
      scale: '1.1',
      color: theme.colors.orange[3],
      transition: 'all ease-in-out 200ms',
    },
  },
}));

interface ICustomHeader extends React.PropsWithChildren<any> {}

const CustomHeader: React.FC<ICustomHeader> = ({ session }) => {
  const router = useRouter();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleSearch = (event: any) => {
    if (event.key === 'Enter')
      alert(`YOU JUST SEARCHED: ${event.currentTarget.value}`);
  };

  const handleSignInClick = () => {
    signIn(undefined, {
      callbackUrl: '/',
    });
  };

  return (
    <Header height={60} px={theme.spacing.lg} className={classes.header}>
      <Group position="apart" w={'100%'}>
        <Group>
          <Link href="/">
            <Avatar
              className={classes.headerLogo}
              alt="Recipe Book Home"
              color="orange"
              radius="xl"
              ff={theme.fontFamily}
              h={40}
              w={40}
            >
              RB
            </Avatar>
          </Link>
          <TextInput
            aria-label="Search Recipe Book App"
            placeholder="Search"
            size={'md'}
            radius="xl"
            rightSection={<IconSearch size={12} stroke={1.5} />}
            onKeyDown={handleSearch}
          />
        </Group>

        <Group position="right" spacing={theme.spacing.sm}>
          {!session ? (
            <CustomButton label="Sign In" active onClick={handleSignInClick} />
          ) : (
            <>
              <Link href={'/browse'}>
                <CustomButton
                  label="Browse"
                  active={router.pathname === '/browse'}
                />
              </Link>
              <Link href={'/my-shelf'}>
                <CustomButton
                  label="My Shelf"
                  active={router.pathname === '/my-shelf'}
                />
              </Link>
              <Link href={'/my-pantry'}>
                <CustomButton
                  label="My Pantry"
                  active={router.pathname === '/my-pantry'}
                />
              </Link>
              <AvatarMenu menuPosition="bottom-end" />
            </>
          )}
        </Group>
      </Group>
    </Header>
  );
};

export default CustomHeader;
