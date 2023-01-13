import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const recipeBooksRouter = createRouter()
  .query('getRecipeBookById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const recipeBook = await ctx.prisma.recipeBook.findUnique({
        where: { id: input.id },
      });

      if (!recipeBook)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find user',
        });

      return recipeBook;
    },
  })
  .query('getRecipeBookWithRecipesById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;

      const recipes = await ctx.prisma.recipeBook.findUnique({
        where: { id: input.id },
        include: {
          recipes: true,
        },
      });

      if (!recipes)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find any recipes',
        });

      return recipes;
    },
  })
  .query('getAllRecipesInBook', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;

      const recipes = await ctx.prisma.recipeBook
        .findUnique({
          where: { id: input.id },
        })
        .recipes();

      if (!recipes)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find any recipes',
        });

      return recipes;
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
        include: {
          user: true,
        },
      });

      if (!recipeBook)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe book',
        });

      return recipeBook;
    },
  });
