import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import {
  Layout,
  Metadata,
  CustomHeader,
  CustomNavbar,
  CardsContainer,
} from '@/components';
import { Text } from '@mantine/core';

const MyShelf: NextPage = () => {
  const { data: session } = trpc.useQuery(['auth.getSession']);

  return !session ? (
    <div>Please sign in to view this page</div>
  ) : (
    <Layout header={<CustomHeader />} navbar={<CustomNavbar />} footer={<></>}>
      <Metadata title="Recipe Book Dashboard" />
      <CardsContainer />
    </Layout>
  );
};

export default MyShelf;
