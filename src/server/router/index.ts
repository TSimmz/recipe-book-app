// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { usersRouter } from './users';
import { booksRouter } from './books';
import { recipesRouter } from './recipes';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('user.', usersRouter)
  .merge('book.', booksRouter)
  .merge('recipe.', recipesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
