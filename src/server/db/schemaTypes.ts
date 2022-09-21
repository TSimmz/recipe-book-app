import { Prisma } from "@prisma/client";

const userPersonalData= Prisma.validator<Prisma.UserArgs>()({
  select: { 
    id: true,
    name: true,
    email: true,
    username: true,
  }
});

export type UserPersonalData = Prisma.UserGetPayload<typeof userPersonalData>;

