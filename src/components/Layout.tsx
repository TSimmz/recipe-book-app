import { AppShell, useMantineTheme } from '@mantine/core';
import { DefaultHeader, DefaultNavbar, DefaultFooter } from './defaults';

type LayoutProps = {
  header?: JSX.Element;
  navbar?: JSX.Element;
  footer?: JSX.Element;
  children: React.ReactNode;
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
          paddingRight: `calc(var(--mantine-aside-width, 0px) + ${theme.spacing.xl}px)`,
          background: theme.colors.dark[7],
        },
      }}
      header={header !== undefined ? header : <DefaultHeader />}
      navbar={navbar !== undefined ? navbar : <DefaultNavbar />}
      navbarOffsetBreakpoint="sm"
      footer={footer !== undefined ? footer : <DefaultFooter />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
