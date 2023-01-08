import { TRPCError } from '@trpc/server';
import { createRouter } from './context';
import { z } from 'zod';

export const recipesRouter = createRouter()
  .query('getRecipeById', {
    input: z.object({
      id: z.string(),
      filter: z
        .object({
          id: z.boolean().optional(),
          createdAt: z.boolean().optional(),
          title: z.boolean().optional(),
          description: z.boolean().optional(),
          cookTime: z.boolean().optional(),
          numberOfServings: z.boolean().optional(),
          ingredients: z.boolean().optional(),
          steps: z.boolean().optional(),
        })
        .optional(),
    }),
    async resolve({ input, ctx }) {
      if (input.id === '') return;

      let recipe;
      if (input.filter === undefined)
        recipe = await ctx.prisma.recipe.findUnique({
          where: { id: input.id },
        });
      else
        recipe = await ctx.prisma.recipe.findUnique({
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
      recipeBookId: z.string(),
      title: z.string(),
      description: z.string(),
      cookTime: z.object({
        hours: z.number().nonnegative().int(),
        minutes: z.number().nonnegative().int().max(59),
      }),
      numberOfServings: z.number().int().positive().min(1),
      ingredients: z
        .object({
          key: z.string(),
          name: z.string(),
          value: z.number(),
          unit: z.string(),
        })
        .array()
        .nonempty(),
      steps: z
        .object({
          key: z.string(),
          stepNumber: z.number().positive().int(),
          description: z.string(),
          note: z.string(),
        })
        .array()
        .nonempty(),
    }),
    async resolve({ input, ctx }) {
      const recipe = await ctx.prisma.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          cookTime: input.cookTime,
          numberOfServings: input.numberOfServings,
          ingredients: input.ingredients,
          steps: input.steps,
          recipeBook: {
            connect: {
              id: input.recipeBookId,
            },
          },
        },
        include: {
          recipeBook: true,
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
