import { z } from "zod";

// Task schema
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean().default(false),
  createdAt: z.string()
});

// Type
export type Task = z.infer<typeof TaskSchema>;