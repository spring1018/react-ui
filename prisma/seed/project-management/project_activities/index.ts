import type { PrismaPromise, ProjectActivity } from "@prisma/client";
import { prisma } from "../..";
import fixture from "./fixture.json";

export const projectActivity = () => {
  const res: PrismaPromise<ProjectActivity>[] = [];
  fixture.forEach((data) => {
    const row = prisma.projectActivity.create({ data });
    res.push(row);
  });
  return res;
};
