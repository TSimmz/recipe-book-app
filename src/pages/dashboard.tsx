import { useState } from 'react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next';
import { Button, TextInput, Textarea } from '@mantine/core';
import { signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookDescription, setBookDescription] = useState('');

  const saveRecipeBook = () => {};

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
          <form>
            <TextInput
              placeholder="Recipe Book Name"
              label="Recipe Book Name"
              required
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              label="Description"
              required
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
            />
            <Button color="yellow" radius="md" size="md">
              Save
            </Button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
