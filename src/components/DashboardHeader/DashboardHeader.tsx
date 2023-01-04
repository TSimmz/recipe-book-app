import {
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
  Text,
} from '@mantine/core';
import useStyles from './styles';
import { IconTrash, IconEdit, IconSettings } from '@tabler/icons';
import { signOut } from 'next-auth/react';
import { ArrowTooltip } from '@/components';

type DashboardHeaderProps = {
  navbarOpened: boolean;
  setNavbarOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

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
  ].map((item) => <Text key={item.title}>{item.title}</Text>);

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
