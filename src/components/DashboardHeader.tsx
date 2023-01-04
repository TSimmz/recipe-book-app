import {
  createStyles,
  Burger,
  Flex,
  Button,
  Header,
  Title,
  Breadcrumbs,
  Group,
  useMantineTheme,
  ActionIcon,
  Avatar,
  Anchor,
} from '@mantine/core';
import { IconTrash, IconEdit, IconSettings } from '@tabler/icons';
import { signOut } from 'next-auth/react';
import { ArrowTooltip } from '@/components';

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
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[4],
  },
  subHeader: {
    height: '35px',
    paddingInline: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.appOrange[5],
  },
}));

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  navbarOpened,
  setNavbarOpened,
}: DashboardHeaderProps) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const testBreadcrumbs = [
    { title: 'My Books', href: '#' },
    { title: "Grandma's Cookin'", href: '#' },
    { title: 'Lasagna', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Header className={classes.header} height={85}>
      <Flex direction="column">
        <div className={classes.mainHeader}>
          <Title order={4}>Recipe Book</Title>
          <Group>
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
            <Avatar size={32} radius="xl" />
          </Group>
        </div>
        <Group position="apart" className={classes.subHeader}>
          <Flex>
            <Burger
              opened={navbarOpened}
              onClick={() => setNavbarOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
            <Breadcrumbs separator=">">{testBreadcrumbs}</Breadcrumbs>
          </Flex>
          <Flex gap={10}>
            <ArrowTooltip label="Delete Recipe" position="bottom">
              <ActionIcon>
                <IconTrash />
              </ActionIcon>
            </ArrowTooltip>
            <ArrowTooltip label="Edit Recipe" position="bottom">
              <ActionIcon>
                <IconEdit />
              </ActionIcon>
            </ArrowTooltip>
            <ArrowTooltip label="Recipe Settings" position="bottom">
              <ActionIcon>
                <IconSettings />
              </ActionIcon>
            </ArrowTooltip>
          </Flex>
        </Group>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
