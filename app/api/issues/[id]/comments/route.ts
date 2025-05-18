import { commentSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = commentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newComment = await prisma.comment.create({
    data: validation.data,
  });

  return NextResponse.json(newComment, { status: 201 });
}

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const comments = await prisma.comment.findMany({
    where: {
      issueId: parseInt(params.id),
    },
    include: {
      author: true,
    },
  });
  return NextResponse.json(comments);
}
