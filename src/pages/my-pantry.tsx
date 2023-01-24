import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { Layout, Metadata, CustomHeader, CustomNavbar } from '@/components';
import { Highlight, Text, useMantineTheme } from '@mantine/core';

const MyPantry: NextPage = () => {
  const { data: session } = trpc.useQuery(['auth.getSession']);
  const theme = useMantineTheme();

  return !session ? (
    <div>Please sign in to view this page</div>
  ) : (
    <Layout
      header={<CustomHeader session={session} />}
      navbar={<CustomNavbar userId={session.id as string} />}
      footer={<></>}
    >
      <Metadata title="My Pantry" />
      <div
        style={{
          width: '100%',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Highlight
          size={20}
          highlight={['Coming', 'soon!']}
          highlightStyles={(theme) => ({
            backgroundImage: theme.fn.linearGradient(
              0,
              theme.colors.orange[3],
              theme.colors.orange[7],
            ),
            fontWeight: 700,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          Coming soon!
        </Highlight>
        <Text w="50%" mt={theme.spacing.md} ta="center">
          My Pantry will allow you to keep track of the food and ingredients you
          have and choose recipes you can make based on what it in your Pantry.
        </Text>
      </div>
    </Layout>
  );
};

export default MyPantry;
