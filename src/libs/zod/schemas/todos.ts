import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../helpers"

export const TodosModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  completed: z.boolean(),
  important: z.boolean(),
  dueDate: z.date(),
  userId: z.string(),
  directoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class TodosDto extends createZodDto(TodosModel) {
}
