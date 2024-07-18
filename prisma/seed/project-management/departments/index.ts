import type { Department, PrismaPromise } from "@prisma/client";
import { prisma } from "../..";
import fixture from "./fixture.json";

export const department = () => {
  const res: PrismaPromise<Department>[] = [];
  fixture.forEach((data) => {
    const row = prisma.department.create({ data });
    res.push(row);
  });
  return res;
};
