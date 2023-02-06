import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import { Layout, Metadata, CustomHeader, CustomNavbar } from '@/components';
import { Highlight, Text, useMantineTheme } from '@mantine/core';

const Recipe: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const theme = useMantineTheme();

  const { data: session } = trpc.useQuery(['auth.getSession']);

  return !session ? (
    <div>Please sign in to view this page</div>
  ) : (
    <Layout
      header={<CustomHeader session={session} />}
      navbar={<CustomNavbar userId={session.id as string} />}
      footer={<></>}
    >
      <Metadata title="My Pantry" />
      <div>RECIPE ID: {id}</div>
    </Layout>
  );
};

export default Recipe;
