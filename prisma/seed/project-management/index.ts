import type { PrismaPromise, Task } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const task = () => {
  const res: PrismaPromise<Task>[] = [];
  fixture.forEach((data) => {
    const row = prisma.task.create({ data });
    res.push(row);
  });
  return res;
};
