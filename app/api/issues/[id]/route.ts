import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
    request: NextRequest,
    props: {
        params: Promise<{id:string}>
    }
) {
    const params = await props.params;
    const body =  await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

    const issue =  await prisma.issue.findUnique({
      where: {
          id: parseInt(params.id)
      }
     })

    if(!issue) return NextResponse.json({error: "Invalid issue"},{status:404});

    const updatedIssue = await prisma.issue.update({
     where: {id: issue.id},
     data:{
         title:validation.data.title,
         description: validation.data.description,
         status: validation.data?.status
     }
    });

    return NextResponse.json(updatedIssue);
}