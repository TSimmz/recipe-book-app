import { AppShell, useMantineTheme } from '@mantine/core';

interface ILayout extends React.PropsWithChildren<any> {
  header?: JSX.Element;
  navbar?: JSX.Element;
  footer?: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ navbar, header, footer, children }) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          paddingRight: `calc(var(--mantine-aside-width, 0px) + ${theme.spacing.xl}px)`,
          background: theme.colors.dark[7],
          maxWidth: '80%',
          margin: '0 auto',
          [theme.fn.largerThan('xl')]: {
            maxWidth: '60%',
          },
        },
      }}
      header={header}
      navbar={navbar}
      navbarOffsetBreakpoint="sm"
      footer={footer}
    >
      <div>{children}</div>
    </AppShell>
  );
};

export default Layout;
