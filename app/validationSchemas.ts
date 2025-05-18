import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export const commentSchema = z
  .object({
    comment: z.string().trim().min(1, "Comment is required").max(255),
    issueId: z.number().int("Issue ID must be an integer"),
    authorId: z.string().min(1, "AuthorId is required").max(255),
  })
  .strict();
