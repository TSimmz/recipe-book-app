import { Menu, Avatar } from '@mantine/core';
import { Position } from '@/utils/types';
import { IconLogout } from '@tabler/icons';
import { signOut } from 'next-auth/react';

type AvatarMenuProps = {
  menuPosition?: Position;
};

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  menuPosition,
}: AvatarMenuProps) => {
  return (
    <Menu position={menuPosition} withArrow arrowPosition="center">
      <Menu.Target>
        <Avatar size={32} radius="xl" style={{ cursor: 'pointer' }} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          w={150}
          icon={<IconLogout size={14} />}
          onClick={() => signOut()}
        >
          {' '}
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarMenu;
