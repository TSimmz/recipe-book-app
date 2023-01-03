import { Global, MantineTheme } from '@mantine/core';

type GlobalStylesProps = {};

const GlobalStyles: React.FC<GlobalStylesProps> = ({}: GlobalStylesProps) => {
  return (
    <Global
      styles={(theme: MantineTheme) => ({
        '*': {
          boxSizing: 'border-box',
          fontFamily:
            'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        },
      })}
    />
  );
};

export default GlobalStyles;
