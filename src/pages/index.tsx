import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { Metadata } from '@/components';
import Image from 'next/image';
import { Title, Button } from '@mantine/core';
import { signIn } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import Router from 'next/router';

const Home: NextPage = () => {
  const { data: session, status } = trpc.useQuery(['auth.getSession']);

  if (session) {
    Router.push('/dashboard');
  }

  const handleSignInClick = () => {
    signIn(undefined, {
      callbackUrl: 'http://localhost:3000/dashboard',
    });
  };

  return (
    <div className={styles.container}>
      <Metadata title="Recipe Book App" />
      <main className={styles.main}>
        <Title order={1}>Recipe Book App</Title>
        <Button
          onClick={handleSignInClick}
          color="yellow"
          radius="md"
          size="md"
        >
          {' '}
          Sign In
        </Button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
