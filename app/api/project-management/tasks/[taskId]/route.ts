import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { taskId: string } },
) {
  try {
    await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });
    return Response.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: { taskId: string } },
) {
  return Response.json({ message: params.taskId });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { taskId: string } },
) {
  try {
    const body = await req.json();
    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title: body.name,
        type: body.type,
        start: body.start,
        end: body.end,
        status: body.status,
        description: body.description,
        progress: body.progress,
        parentTaskId: body.parentTaskId,
        projectId: body.projectId,
      },
    });
    return Response.json({ task });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
