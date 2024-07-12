import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany();
  // title を name に変更
  return Response.json({
    tasks: tasks.map((t) => ({
      ...t,
      name: t.title,
      start: new Date(t.start),
      end: new Date(t.end),
    })),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const task = await prisma.task.create({
      data: {
        title: body.name,
        type: body.type,
        start: body.start,
        end: body.end,
        progress: body.progress,
        projectId: body.projectId,
      },
    });
    return Response.json({ task }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const task = await prisma.task.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.name,
        type: body.type,
        start: body.start,
        end: body.end,
        progress: body.progress,
        projectId: body.projectId,
      },
    });
    return Response.json({ task });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
