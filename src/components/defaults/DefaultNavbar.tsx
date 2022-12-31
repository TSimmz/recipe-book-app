import { useState } from 'react';
import { Navbar, Text, useMantineTheme } from '@mantine/core';

type DefaultNavbarProps = {};

const DefaultNavbar: React.FC<
  DefaultNavbarProps
> = ({}: DefaultNavbarProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};

export default DefaultNavbar;
