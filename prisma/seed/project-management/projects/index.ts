import type { PrismaPromise, Project } from "@prisma/client";
import { prisma } from "../..";
import fixture from "./fixture.json";

export const project = () => {
  const res: PrismaPromise<Project>[] = [];
  fixture.forEach((data) => {
    const row = prisma.project.create({ data });
    res.push(row);
  });
  return res;
};
