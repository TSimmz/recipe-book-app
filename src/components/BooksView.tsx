import { trpc } from '@/utils/trpc';
import { Group, useMantineTheme } from '@mantine/core';
import { ComponentShelf, BooksList } from '@/components';

interface IBooksView extends React.PropsWithChildren<any> {
  userId: string;
}

const BooksView: React.FC<IBooksView> = ({ userId }) => {
  const theme = useMantineTheme();

  return (
    <Group spacing={theme.other.remSizing.md}>
      <ComponentShelf title="My Books">
        <BooksList userId={userId} />
      </ComponentShelf>

      {/* ==== Selected Book Card ==== */}
    </Group>
  );
};

export default BooksView;
