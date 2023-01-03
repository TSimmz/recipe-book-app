import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { Metadata } from '@/components';
import { Title, Button } from '@mantine/core';
import { signIn } from 'next-auth/react';
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
    <div>
      <Metadata title="Recipe Book App" />
      <main>
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
    </div>
  );
};

export default Home;
