import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(
  _req: Request,
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
    console.error("PUT TASK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params; 
    const taskId = Number(id);

    const body = await req.json();

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.priority !== undefined && {
          priority: body.priority,
        }),
        ...(body.dueDate !== undefined && {
          dueDate: body.dueDate,
        }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH TASK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to edit task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: Params
) {
  try {
    const { id } = await params; 
    const taskId = Number(id);

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}