import { z } from "zod";

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
