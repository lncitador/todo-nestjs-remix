import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../helpers"

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  avatar: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export class UserDto extends createZodDto(UserModel) {
}
