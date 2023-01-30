import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const recipesRouter = createRouter()
  .query('getRecipeById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;

      const recipe = await ctx.prisma.recipe.findUnique({
        where: { id: input.id },
      });

      if (!recipe)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe',
        });

      return recipe;
    },
  })
  .query('getFilteredRecipeById', {
    input: z.object({
      id: z.string(),
      filter: z.object({
        id: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        title: z.boolean().optional(),
        description: z.boolean().optional(),
        prepTime: z.boolean().optional(),
        cookTime: z.boolean().optional(),
        numberOfServings: z.boolean().optional(),
        ingredients: z.boolean().optional(),
        steps: z.boolean().optional(),
      }),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;

      const recipe = await ctx.prisma.recipe.findUnique({
        where: { id: input.id },
        select: { ...input.filter },
      });

      if (!recipe)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe',
        });

      return recipe;
    },
  })
  .mutation('createRecipe', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      prepTime: z.object({
        hours: z.number().nonnegative().int(),
        minutes: z.number().nonnegative().int().max(59),
      }),
      cookTime: z.object({
        hours: z.number().nonnegative().int(),
        minutes: z.number().nonnegative().int().max(59),
      }),
      numberOfServings: z.number().int().positive().min(1),
      ingredients: z
        .object({
          key: z.string(),
          value: z.number(),
          unit: z.string(),
          name: z.string(),
        })
        .array(),
      steps: z
        .object({
          key: z.string(),
          stepNumber: z.number().positive().int(),
          description: z.string(),
          note: z.string(),
        })
        .array(),

      bookId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const recipe = await ctx.prisma.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          prepTime: input.prepTime,
          cookTime: input.cookTime,
          numberOfServings: input.numberOfServings,
          ingredients: input.ingredients,
          steps: input.steps,
          book: {
            connect: {
              id: input.bookId,
            },
          },
        },
        include: {
          book: true,
        },
      });

      if (!recipe)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe',
        });

      return recipe;
    },
  })
  .mutation('updateRecipe', {
    input: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      prepTime: z.object({
        hours: z.number().nonnegative().int(),
        minutes: z.number().nonnegative().int().max(59),
      }),
      cookTime: z.object({
        hours: z.number().nonnegative().int(),
        minutes: z.number().nonnegative().int().max(59),
      }),
      numberOfServings: z.number().int().positive().min(1),
      ingredients: z
        .object({
          key: z.string(),
          value: z.number(),
          unit: z.string(),
          name: z.string(),
        })
        .array(),
      steps: z
        .object({
          key: z.string(),
          stepNumber: z.number().positive().int(),
          description: z.string(),
          note: z.string(),
        })
        .array(),
    }),
    async resolve({ input, ctx }) {
      const recipe = await ctx.prisma.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          prepTime: input.prepTime,
          cookTime: input.cookTime,
          numberOfServings: input.numberOfServings,
          ingredients: input.ingredients,
          steps: input.steps,
        },
      });

      if (!recipe)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe',
        });

      return recipe;
    },
  })
  .mutation('deleteRecipe', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;
      const recipe = await ctx.prisma.recipe.delete({
        where: {
          id: input.id,
        },
      });

      if (!recipe)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to find recipe',
        });

      return recipe;
    },
  });
