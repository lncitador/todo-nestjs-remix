import { Prisma } from '@prisma/client';
import { addDays } from 'date-fns';

interface TaskInput {
  userId: string;
  directoryId: string;
}

export const TASKS = ({
  userId,
  directoryId,
}: TaskInput): Prisma.TodosUncheckedCreateInput[] => [
  {
    title: 'Email verification',
    description: 'Send email verification to user',
    dueDate: addDays(new Date(), 1),
    userId,
    directoryId,
  },
  {
    title: 'Email views',
    description: 'Create email views',
    dueDate: addDays(new Date(), 2),
    userId,
    directoryId,
  },
];
