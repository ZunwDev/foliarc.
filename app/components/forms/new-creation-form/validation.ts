import { z } from "zod";

export const NewCreationSchema = z.object({
  url: z.string().url("Invalid URL format"),
  technologies: z.array(z.object({ value: z.string(), label: z.string() })).min(1, "At least one tag must be selected"),
  type: z.string().min(1, "Please select a type"),
  title: z.string().optional(),
});
