import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import {
  createStyles,
  Burger,
  Flex,
  Button,
  Header,
  Title,
  Tooltip,
  Pagination,
  useMantineTheme,
  ActionIcon,
  Avatar,
} from '@mantine/core';
import { IconTrash, IconEdit, IconSettings } from '@tabler/icons';
import { signOut } from 'next-auth/react';

type DashboardHeaderProps = {
  navbarOpened: boolean;
  setNavbarOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = createStyles((theme) => ({
  header: {
    boxSizing: 'border-box',
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.xs,
  },
  subHeader: {
    height: '35px',
    paddingInline: theme.spacing.xs,
  },
}));

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  navbarOpened,
  setNavbarOpened,
}: DashboardHeaderProps) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Header className={classes.header} height={85}>
      <Flex direction="column">
        <div className={classes.mainHeader}>
          <Title order={4}>Recipe Book</Title>
          <Button
            onClick={() => {
              signOut();
            }}
            color="yellow"
            radius="md"
            size="xs"
          >
            {' '}
            Sign Out
          </Button>
        </div>
        <div className={classes.subHeader}>
          <Burger
            opened={navbarOpened}
            onClick={() => setNavbarOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </div>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
