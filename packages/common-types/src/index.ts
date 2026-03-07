<<<<<<< HEAD
import { z } from "zod";

// Task schema
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean().default(false),
  createdAt: z.string()
});

// Type
=======
import { z } from "zod";

// Task schema
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  completed: z.boolean().default(false),
  createdAt: z.string()
});

// Type
>>>>>>> 97ec523c03aa7a64e6b8e08c1a6a4bd903d446de
export type Task = z.infer<typeof TaskSchema>;