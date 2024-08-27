import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const projectActivities = await prisma.projectActivity.findMany();
  return Response.json({ projectActivities });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const activity = await prisma.projectActivity.create({
      data: {
        projectId: body.projectId,
        userId: body.userId,
        tag: body.tag,
        content: body.content,
      },
    });
    return Response.json({ activity }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
