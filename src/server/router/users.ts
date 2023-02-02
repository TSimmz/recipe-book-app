import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const usersRouter = createRouter()
  .query('getUserById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });

      if (!user)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find user',
        });
      return user;
    },
  })
  .query('getUserByEmail', {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.email === '') return;
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      });

      if (!user)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find user',
        });
      return user;
    },
  })
  .query('getAllUsers', {
    async resolve({ ctx }) {
      const users = await ctx.prisma.user.findMany();

      if (!users)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find users',
        });
      return users;
    },
  })
  .query('getUserBooks', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const books = await ctx.prisma.user
        .findUnique({
          where: { id: input.id },
        })
        .books();

      if (!books)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Failed to find user's recipe books",
        });
      return books;
    },
  })
  .query('getUserRecipes', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const recipes = await ctx.prisma.user
        .findUnique({
          where: { id: input.id },
        })
        .recipes();

      if (!recipes)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Failed to find user's recipe books",
        });

      return recipes;
    },
  });
