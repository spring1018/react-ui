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
