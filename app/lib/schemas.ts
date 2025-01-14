import { z } from "zod";

export const NewSubmissionSchema = z
  .object({
    url: z.string().url("Invalid URL format"),
    technologies: z.array(z.object({ value: z.string(), label: z.string() })).min(1, "At least one tag must be selected"),
    type: z.string().min(1, "Please select a type"),
    title: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type.toLowerCase() === "project" && (!data.title || !data.title.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Title is required for projects",
        path: ["title"],
      });
    }
    return true;
  });

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .trim(),
  bio: z
    .string()
    .max(200, { message: "Bio must not exceed 200 characters" })
    .optional()
    .transform((val) => val?.trim() || null),
  tags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "At least one tag must be selected")
    .max(3, "You can select up to 3 tags"),
  location: z.string().optional(),
  socials: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format"),
        platform: z.string().optional(),
      })
    )
    .optional()
    .default([]),
});

export const NewProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(16, { message: "Username must not exceed 16 characters" })
    .trim(),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .trim(),
  bio: z
    .string()
    .max(200, { message: "Bio must not exceed 200 characters" })
    .optional()
    .transform((val) => val?.trim() || null),
  tags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "At least one tag must be selected")
    .max(3, "You can select up to 3 tags"),
});

export const NewPortfolioSchema = z.object({
  url: z.string().url("Invalid URL format"),
  technologies: z.array(z.object({ value: z.string(), label: z.string() })).min(1, "At least one tag must be selected"),
  type: z.string().min(1, "Please select a type"),
  title: z.string().optional(),
});
