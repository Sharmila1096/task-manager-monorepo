import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(
  _req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const taskId = Number(id);

    const existing = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        done: !Boolean(existing.done),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}