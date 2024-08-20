import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.id,
    },
  });
  return Response.json({ project });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const project = await prisma.project.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        start: body.start,
        end: body.end,
        progress: body.progress,
      },
    });
    return Response.json({ task: project });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.project.delete({
      where: {
        id: params.id,
      },
    });
    return Response.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
