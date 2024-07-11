import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const tasks = await prisma.sampleTask.findMany();
  return Response.json({
    tasks,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const task = await prisma.sampleTask.create({
      data: {
        title: body.title,
        status: body.status,
        priority: body.priority,
      },
    });
    return Response.json({ task }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    await prisma.sampleTask.delete({
      where: {
        id: body.id,
      },
    });
    return Response.json({ message: "Deleted" });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const task = await prisma.sampleTask.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        status: body.status,
        priority: body.priority,
      },
    });
    return Response.json({ task });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
