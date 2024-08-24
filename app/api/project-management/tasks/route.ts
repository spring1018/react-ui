import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      parent: true,
      project: true,
    },
  });
  // tasks に対して以下の sortKey 列を作って並び替える
  // 1. parent が存在しない場合、自身の start を sortKey にする
  // 2. parent が存在する場合、parent の start と自身の start を結合した文字列を sortKey にする
  const newTasks = tasks.map((t) => {
    if (!t.parent) {
      return {
        ...t,
        sortKey: t.start,
      };
    }
    return {
      ...t,
      sortKey: `${t.parent.start}${t.start}`,
    };
  });

  return Response.json({
    tasks: newTasks.map((t) => ({
      ...t,
      name: t.title,
      start: new Date(t.start),
      end: new Date(t.end),
    })),
  });
  // return Response.json({
  //   tasks: tasks.map((t) => ({
  //     ...t,
  //     name: t.title,
  //     start: new Date(t.start),
  //     end: new Date(t.end),
  //   })),
  // });
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
        status: body.status,
        description: body.description,
        progress: body.progress,
        parentTaskId: body.parentTaskId,
        projectId: body.projectId,
      },
    });
    return Response.json({ task }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
