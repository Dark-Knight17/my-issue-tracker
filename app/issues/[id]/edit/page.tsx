import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

const EditIssuePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
