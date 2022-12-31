import { useState } from 'react';
import {
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

type DefaultHeaderProps = {};

const DefaultHeader: React.FC<
  DefaultHeaderProps
> = ({}: DefaultHeaderProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Header height={50} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </Header>
  );
};

export default DefaultHeader;
