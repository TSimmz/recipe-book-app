import { Footer } from '@mantine/core';

type DefaultFooterProps = {};

const DefaultFooter: React.FC<
  DefaultFooterProps
> = ({}: DefaultFooterProps) => {
  return (
    <Footer height={60} p="md">
      Application footer
    </Footer>
  );
};

export default DefaultFooter;
