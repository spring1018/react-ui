import { PrismaClient } from "@prisma/client";
import { department } from "./project-management/departments";
import { project } from "./project-management/projects";
import { task } from "./project-management/tasks";
import { useDepartment } from "./project-management/user_departments";
import { user } from "./project-management/users";
import { sampleTask } from "./sample-task";

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.sampleTask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.userDepartment.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();
  console.log(`Existing tasks deleted.`);
  await prisma.$transaction([
    ...sampleTask(),
    ...project(),
    ...task(),
    ...user(),
    ...department(),
    ...useDepartment(),
  ]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
