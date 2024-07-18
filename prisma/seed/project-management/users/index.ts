import type { PrismaPromise, User } from "@prisma/client";
import { prisma } from "../..";
import fixture from "./fixture.json";

export const user = () => {
  const res: PrismaPromise<User>[] = [];
  fixture.forEach((data) => {
    const row = prisma.user.create({ data });
    res.push(row);
  });
  return res;
};
