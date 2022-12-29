
import Head from 'next/head';

interface MetadataProps {
  title: string,
}

const Metadata: React.FC<MetadataProps> = ({title}) => {

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="A recipe book app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Metadata;