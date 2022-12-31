import { AppShell, useMantineTheme } from '@mantine/core';
import { DefaultHeader, DefaultNavbar, DefaultFooter } from './defaults';

type LayoutProps = {
  header?: JSX.Element;
  navbar?: JSX.Element;
  footer?: JSX.Element;
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({
  navbar,
  header,
  footer,
  children,
}: LayoutProps) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={navbar !== undefined ? navbar : <DefaultNavbar />}
      navbarOffsetBreakpoint="sm"
      footer={footer !== undefined ? footer : <DefaultFooter />}
      header={header !== undefined ? header : <DefaultHeader />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
