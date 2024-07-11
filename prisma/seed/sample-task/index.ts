import type { PrismaPromise, SampleTask } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const sampleTask = () => {
  const res: PrismaPromise<SampleTask>[] = [];
  fixture.forEach((data) => {
    const row = prisma.sampleTask.create({ data });
    res.push(row);
  });
  return res;
};
