import { Header, Group, Title, useMantineTheme } from '@mantine/core';
import { AvatarMenu, CustomNavLink } from '@/components';
import { useRouter } from 'next/router';

type CustomHeaderProps = {};

const CustomHeader: React.FC<CustomHeaderProps> = ({}: CustomHeaderProps) => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Header
      height={60}
      py={theme.spacing.sm}
      px={theme.spacing.lg}
      bg={theme.colors.dark[9]}
      style={{ borderColor: theme.colors.dark[9] }}
    >
      <Group position="apart">
        <Title size={32} fw="normal">
          Recipe Book
        </Title>
        <Group position="right">
          <CustomNavLink
            label="Browse"
            linkTo="#"
            active={router.pathname === '/browse'}
          />
          <CustomNavLink
            label="My Shelf"
            linkTo="#"
            active={router.pathname === '/my-shelf'}
          />
          <CustomNavLink
            label="My Pantry"
            linkTo="#"
            active={router.pathname === '/my-pantry'}
          />
          <AvatarMenu menuPosition="bottom-end" />
        </Group>
      </Group>
    </Header>
  );
};

export default CustomHeader;
