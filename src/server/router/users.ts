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
  .query("getUserByEmail", {
    input: z.object({
      email: z.string()
    }),
    async resolve({input, ctx}) {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email }
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