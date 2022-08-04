import { useState } from 'react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import { z } from 'zod';
import CreateRecipeBook from '@/components/CreateRecipeBook';

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);

  if (!session) {
    return (
      <div className={styles.container}>Please sign in to view this page</div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe Book App</title>
        <meta name="description" content="A recipe book app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        This page is secret!
        <Button
          onClick={() => {
            signOut();
          }}
          color="yellow"
          radius="md"
          size="md"
        >
          {' '}
          Sign Out
        </Button>
        {!openCreateRecipeBook && (
          <div style={{ margin: '1rem' }}>
            <Button
              color="yellow"
              radius="md"
              size="md"
              onClick={() => setOpenCreateRecipeBook(true)}
            >
              Create Recipe Book
            </Button>
          </div>
        )}
        {openCreateRecipeBook && (
          <CreateRecipeBook setOpenCreateRecipeBook={setOpenCreateRecipeBook} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
