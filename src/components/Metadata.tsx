import Head from 'next/head';

type MetadataProps = {
  title: string;
};

const Metadata: React.FC<MetadataProps> = ({ title }: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="A recipe book app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Metadata;
