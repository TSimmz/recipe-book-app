import {
  Header,
  Group,
  TextInput,
  useMantineTheme,
  createStyles,
  Avatar,
  Code,
} from '@mantine/core';
import { AvatarMenu, CustomButton, CustomNavLink } from '@/components';
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
  searchBar: {
    '& input:focus': {
      borderColor: theme.colors.orange[4],
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
            className={classes.searchBar}
            aria-label="Search Recipe Book App"
            placeholder="Search"
            size={'md'}
            radius="xl"
            rightSection={<IconSearch size={12} stroke={1.5} />}
            onKeyDown={handleSearch}
          />
        </Group>

        <Group position="right">
          {!session ? (
            <CustomButton
              label="Sign In"
              active
              onClickHandler={handleSignInClick}
            />
          ) : (
            <>
              <CustomNavLink
                label="Browse"
                linkTo="/browse"
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
            </>
          )}
        </Group>
      </Group>
    </Header>
  );
};

export default CustomHeader;
