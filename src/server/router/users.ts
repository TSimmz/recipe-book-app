import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const usersRouter = createRouter()
  .query("getUserById", {
    input: z.object({
      id: z.string()
    }),
    async resolve({input, ctx}) {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id }
      })

      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "Failed to find user"})
      return user;
    }
  })
  .query("getUsersRecipeBooks", {
    input: z.object({
      id: z.string()
    }),
    async resolve({input, ctx}) {
      const recipeBooks = await ctx.prisma.user.findUnique({
        where: {id : input.id },
      }).recipeBooks();

      if (!recipeBooks) throw new TRPCError({ code: "NOT_FOUND", message: "Failed to find user's recipe books"})
      return recipeBooks;
    }
  })
  .query("getUserByEmail", {
    input: z.object({
      email: z.string()
    }),
    async resolve({input, ctx}) {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
        select: { 
          id: true,
          name: true,
          email: true,
          username: true
        }
      })

      if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "Failed to find user"})
      return user;
    } 
  })
  .query("getAllUsers", {
    async resolve({ctx}) {
      const users = await ctx.prisma.user.findMany();

      if (!users) throw new TRPCError({ code: "NOT_FOUND", message: "Failed to find users"})
      return users;
    }
  });