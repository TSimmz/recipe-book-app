import {
  Card,
  Stack,
  Title,
  Text,
  Image,
  useMantineTheme,
} from '@mantine/core';

interface ISelectedBook extends React.PropsWithChildren<any> {
  selectedBookData: any;
}

const SelectedBook: React.FC<ISelectedBook> = ({ selectedBookData }) => {
  const theme = useMantineTheme();
  if (selectedBookData === undefined) return null;

  const { title, image, description } = selectedBookData;

  return (
    <Card radius={'md'}>
      <Card.Section>
        <Image src={image} alt="Book image" height={110} withPlaceholder />
      </Card.Section>
      <Card.Section>
        <Stack p={16}>
          <Title fz={theme.other.remSizing.md}>{title}</Title>
          <Text fz={theme.other.remSizing.sm} italic lineClamp={4}>
            {`"${description}"`}
          </Text>
        </Stack>
      </Card.Section>
      <Card.Section
        h={30}
        pos="absolute"
        bottom={theme.spacing.lg}
        right={theme.spacing.xl}
      >
        {/** Book tags go here */}
      </Card.Section>
    </Card>
  );
};

export default SelectedBook;
