import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const booksRouter = createRouter()
  .query('getBookById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const book = await ctx.prisma.book.findUnique({
        where: { id: input.id },
      });

      if (!book)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find user',
        });

      return book;
    },
  })
  .query('getBookWithRecipesById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;

      const recipes = await ctx.prisma.book.findUnique({
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

      const recipes = await ctx.prisma.book
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
  .mutation('createBook', {
    input: z.object({
      userId: z.string(),
      title: z.string(),
      description: z.string(),
    }),
    async resolve({ input, ctx }) {
      const book = await ctx.prisma.book.create({
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

      if (!book)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe book',
        });

      return book;
    },
  })
  .mutation('editBook', {
    input: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    }),
    async resolve({ input, ctx }) {
      const book = await ctx.prisma.book.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
        },
      });

      if (!book)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe book',
        });

      return book;
    },
  })
  .mutation('deleteBook', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const book = await ctx.prisma.book.delete({
        where: {
          id: input.id,
        },
      });

      if (!book)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe book',
        });

      return book;
    },
  });
