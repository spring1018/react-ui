import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const projectActivity = await prisma.projectActivity.findFirst({
    where: {
      id: params.id,
    },
  });
  return Response.json({ projectActivity });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const projectActivity = await prisma.projectActivity.update({
      where: {
        id: params.id,
      },
      data: {
        projectId: body.projectId,
        userId: body.userId,
        tag: body.tag,
        content: body.content,
      },
    });
    return Response.json({ projectActivity });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.projectActivity.delete({
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
