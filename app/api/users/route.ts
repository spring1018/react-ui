import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      departments: {
        include: {
          department: true,
        },
      },
    },
  });

  return Response.json(users);
}
