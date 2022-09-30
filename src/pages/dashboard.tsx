import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { Button } from '@mantine/core';
import { signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import CreateRecipeBook from '@/components/CreateRecipeBook';
import CreateRecipe from '@/components/CreateRecipe';

const Dashboard: NextPage = () => {
  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
  const [openCreateRecipe, setOpenCreateRecipe] = useState(false);

  const { data: session } = trpc.useQuery(['auth.getSession'], {
    refetchInterval: 500,
    refetchIntervalInBackground: true,
  });
  const userId = session?.id as string;

  const recipeBooks = trpc.useQuery(
    ['user.getUsersRecipeBooks', { id: session?.id as string }],
    {
      refetchInterval: 500,
      refetchIntervalInBackground: true,
    },
  );

  // if (recipeBooks.status === 'success') {
  //   console.log('Recipe Books: ', recipeBooks?.data);
  // }

  return !session ? (
    <div className={styles.container}>Please sign in to view this page</div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Recipe Book App</title>
        <meta name="description" content="A recipe book app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            <CreateRecipeBook
              userId={userId}
              setOpenCreateRecipeBook={setOpenCreateRecipeBook}
            />
          )}
          {!openCreateRecipe && (
            <div style={{ margin: '1rem' }}>
              <Button
                color="yellow"
                radius="md"
                size="md"
                onClick={() => setOpenCreateRecipe(true)}
              >
                Create Recipe
              </Button>
            </div>
          )}
          {openCreateRecipe && (
            <CreateRecipe
              recipeBookId={'recipeBookId'}
              setOpenCreateRecipe={setOpenCreateRecipe}
            />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recipeBooks.status === 'success' && (
            <>
              {recipeBooks.data.map((recipeBook) => {
                return (
                  <div key={recipeBook.title}>
                    <h2>{recipeBook.title}</h2>
                    <h4>{recipeBook.description}</h4>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
