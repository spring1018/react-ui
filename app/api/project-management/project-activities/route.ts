import { prisma } from "@/lib/prisma";
// import { NextRequest } from "next/server";

export async function GET() {
  const projectActivities = await prisma.projectActivity.findMany();
  return Response.json({ projectActivities });
}

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const project = await prisma.project.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         status: body.status,
//         start: body.start,
//         end: body.end,
//         progress: body.progress,
//       },
//     });
//     return Response.json({ task: project }, { status: 201 });
//   } catch (err) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
