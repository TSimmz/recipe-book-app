import { useState } from 'react';
import {
  Burger,
  Flex,
  Header,
  Title,
  Breadcrumbs,
  Group,
  useMantineTheme,
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
import { IconButton, AvatarMenu } from '@/components';
import { useAppDispatch } from '@/features/store';
import {
  selectNavbarOpened,
  selectActiveRecipeBook,
  selectActiveRecipe,
  toggleNavbar,
  setNavbarWidth,
} from '@/features/dashboard/dashboardSlice';
import { useSelector } from 'react-redux';

type DashboardHeaderProps = {
  recipeBooks: any;
  recipes: any;
};

const DashboardHeader: React.FC<
  DashboardHeaderProps
> = ({}: DashboardHeaderProps) => {
  const dispatch = useAppDispatch();

  const navbarOpened = useSelector(selectNavbarOpened);
  const activeRecipeBook = useSelector(selectActiveRecipeBook);
  const activeRecipe = useSelector(selectActiveRecipe);

  const { classes } = useStyles();
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

  const disabledRecipeButtons = activeRecipe === '';

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

          <AvatarMenu menuPosition="bottom-end" />
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
              onClick={() => {
                dispatch(toggleNavbar());
                dispatch(setNavbarWidth(440));
              }}
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
            <IconButton
              label="Edit Recipe"
              tooltipPosition="bottom"
              icon={<IconEdit />}
              disabled={disabledRecipeButtons}
            />
            <IconButton
              label="Recipe Settings"
              tooltipPosition="bottom"
              icon={<IconSettings />}
              disabled={disabledRecipeButtons}
            />
          </Flex>
        </Group>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
