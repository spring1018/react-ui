import { PrismaClient } from "@prisma/client";
import { task } from "./project-management/tasks";
import { user } from "./project-management/users";
import { sampleTask } from "./sample-task";

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  console.log(`Existing tasks deleted.`);
  await prisma.$transaction([...sampleTask(), ...task(), ...user()]);
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
