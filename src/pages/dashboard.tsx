import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/pages/store';
import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { Button } from '@mantine/core';
import { signOut } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import { selectUser, setUser } from '@/features/user/userSlice';
import CreateRecipeBook from '@/components/CreateRecipeBook';

const Dashboard: NextPage = () => {
  const dispatch = useAppDispatch();

  const { data: session } = trpc.useQuery(['auth.getSession']);
  const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);

  const user = useSelector(selectUser);
  const {data: userData} = trpc.useQuery(['user.getUserByEmail', {email: session?.user?.email || ''}]);
  
  useEffect(() => {
    if (session) {
      if (userData){
        
        dispatch(setUser(userData));
        console.log('User data: ', userData);
      }
    }
  }
  , [ userData, session ]);


  return (
    !session ? 
    <div className={styles.container}>Please sign in to view this page</div> :
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
