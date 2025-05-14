import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/prisma/client'
import { issueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest){
    const body =  await request.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400});

    const newIsuue = await prisma.issue.create({
        data: validation.data
    });

    return NextResponse.json(newIsuue,{status:201});
}