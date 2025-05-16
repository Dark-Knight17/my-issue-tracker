import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIsuue = await prisma.issue.create({
    data: validation.data,
  });

  return NextResponse.json(newIsuue, { status: 201 });
}
