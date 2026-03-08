export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { prisma } = await import("@/lib/prisma");

  try {
    const tasks = await prisma.task.findMany({
      orderBy: { position: "asc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { prisma } = await import("@/lib/prisma");

  try {
    const body = await req.json();

    const task = await prisma.task.create({
      data: {
        title: body.title,
        position: body.position ?? 0,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}