import { Menu, Avatar, Text, createStyles } from '@mantine/core';
import { Position } from '@/utils/types';
import { IconUser, IconLogout } from '@tabler/icons';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const useStyles = createStyles((theme) => ({
  menuLink: {
    textDecoration: 'none',
  },
}));

type AvatarMenuProps = {
  menuPosition?: Position;
};

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  menuPosition,
}: AvatarMenuProps) => {
  const { classes } = useStyles();

  return (
    <Menu position={menuPosition} width={200} withArrow arrowPosition="center">
      <Menu.Target>
        <Avatar size={32} radius="xl" style={{ cursor: 'pointer' }} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconUser size={14} />}>
          <Link href="/profile">
            <Text className={classes.menuLink}>Profile</Text>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />} onClick={() => signOut()}>
          {' '}
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;
