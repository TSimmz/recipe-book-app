import { AppShell, useMantineTheme } from '@mantine/core';

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
      header={header}
      navbar={navbar}
      navbarOffsetBreakpoint="sm"
      footer={footer}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
