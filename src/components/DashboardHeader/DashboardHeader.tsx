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
import { trpc } from '@/utils/trpc';
import {
  IconTrash,
  IconEdit,
  IconSettings,
  IconArrowRight,
} from '@tabler/icons';
import { signOut } from 'next-auth/react';
import { ArrowTooltip } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  selectNavbarOpened,
  selectActiveRecipeBook,
  selectActiveRecipe,
  toggleNavbar,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';

type DashboardHeaderProps = {};

const DashboardHeader: React.FC<
  DashboardHeaderProps
> = ({}: DashboardHeaderProps) => {
  const dispatch = useAppDispatch();

  const navbarOpened = useSelector(selectNavbarOpened);
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);

  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const recipeBook = trpc.useQuery([
    'recipebook.getRecipeBookById',
    { id: activeRecipeBook },
  ]);
  const recipe = trpc.useQuery(['recipe.getRecipeById', { id: activeRecipe }]);

  const breadCrumbs = [
    { crumb: 'My Books' },
    { crumb: recipeBook.data?.title },
    { crumb: recipe.data?.title },
  ].map((item) => item.crumb && <Text key={item.crumb}>{item.crumb}</Text>);

  return (
    <Header className={classes.header} height={85}>
      <Flex direction="column">
        <Group
          className={classes.mainHeader}
          position="apart"
          h={50}
          py={7}
          px={24}
        >
          <Title size={24} fw={'normal'} ff={theme.fontFamily}>
            Recipe Book
          </Title>
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
        </Group>
        <Group
          className={classes.subHeader}
          position="apart"
          h={35}
          pl={12}
          pr={24}
        >
          <Flex>
            <Burger
              opened={navbarOpened}
              onClick={() => dispatch(toggleNavbar())}
              size="sm"
              color={theme.black}
              mr={12}
            />
            <Breadcrumbs
              fz={18}
              separator={<IconArrowRight color={theme.black} size={18} />}
            >
              {breadCrumbs}
            </Breadcrumbs>
          </Flex>
          <Flex gap={8}>
            <ArrowTooltip label="Delete Recipe" position="bottom">
              <ActionIcon color="dark">
                <IconTrash />
              </ActionIcon>
            </ArrowTooltip>
            <ArrowTooltip label="Edit Recipe" position="bottom">
              <ActionIcon color="dark">
                <IconEdit />
              </ActionIcon>
            </ArrowTooltip>
            <ArrowTooltip label="Recipe Settings" position="bottom">
              <ActionIcon color="dark">
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
