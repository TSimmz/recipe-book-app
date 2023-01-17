import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { Layout, Metadata, CustomHeader } from '@/components';
import { Text } from '@mantine/core';

const Home: NextPage = () => {
  const { data: session } = trpc.useQuery(['auth.getSession']);

  return (
    <Layout
      header={<CustomHeader session={session} />}
      navbar={<></>}
      footer={<></>}
    >
      <Metadata title="Recipe Book Dashboard" />
      <div
        style={{
          width: '100%',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text> THIS IS THE HOME PAGE! </Text>
      </div>
    </Layout>
  );
};

export default Home;
