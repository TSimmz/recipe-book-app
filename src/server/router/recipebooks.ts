import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const recipeBooksRouter = createRouter()
  .query('getRecipeBookByUserId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
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
  .mutation('createRecipeBook', {
    input: z.object({
      userId: z.string(),
      title: z.string(),
      description: z.string(),
    }),
    async resolve({ input, ctx }) {
      const recipeBook = await ctx.prisma.recipeBook.create({
        data: {
          title: input.title,
          description: input.description,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });

      if (!recipeBook)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find user',
        });

      return recipeBook;
    },
  });
