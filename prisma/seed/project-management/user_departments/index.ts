import type { PrismaPromise, UserDepartment } from "@prisma/client";
import { prisma } from "../..";
import fixture from "./fixture.json";

export const useDepartment = () => {
  const res: PrismaPromise<UserDepartment>[] = [];
  fixture.forEach((data) => {
    const row = prisma.userDepartment.create({ data });
    res.push(row);
  });
  return res;
};
