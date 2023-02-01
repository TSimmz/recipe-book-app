import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import {
  Layout,
  Metadata,
  CustomHeader,
  CustomNavbar,
  Shelf,
  BooksView,
} from '@/components';

const MyShelf: NextPage = () => {
  const { data: session } = trpc.useQuery(['auth.getSession']);

  return !session ? (
    <div>Please sign in to view this page</div>
  ) : (
    <Layout
      header={<CustomHeader session={session} />}
      navbar={false ? <CustomNavbar userId={session?.id as string} /> : <></>}
      footer={<></>}
    >
      <Metadata title="Recipe Book Dashboard" />
      {/* <Shelf userId={session.id as string} /> */}
      <BooksView userId={session.id as string} />
    </Layout>
  );
};

export default MyShelf;
