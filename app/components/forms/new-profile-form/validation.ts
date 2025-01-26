import { z } from "zod";

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
