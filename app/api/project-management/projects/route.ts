import { prisma } from "@/lib/prisma";
// import { NextRequest } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany();
  return Response.json({ projects });
}

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const task = await prisma.task.create({
//       data: {
//         title: body.name,
//         level: body.level,
//         start: body.start,
//         end: body.end,
//         progress: body.progress,
//         projectId: body.projectId,
//       },
//     });
//     return Response.json({ task }, { status: 201 });
//   } catch (err) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const task = await prisma.task.update({
//       where: {
//         id: body.id,
//       },
//       data: {
//         title: body.name,
//         type: body.type,
//         level: body.level,
//         start: body.start,
//         end: body.end,
//         progress: body.progress,
//         projectId: body.projectId,
//       },
//     });
//     return Response.json({ task });
//   } catch (err) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
