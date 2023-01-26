import Head from 'next/head';

interface IMetadata extends React.PropsWithChildren<any> {
  title: string;
}

const Metadata: React.FC<IMetadata> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="A recipe book app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Metadata;
