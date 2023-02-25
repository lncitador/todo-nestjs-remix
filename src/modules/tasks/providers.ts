import { Provider } from '@nestjs/common';
import { ITasksRepository } from './domain/repositories/tasks.repository';
import { TasksPrismaRepository } from './infrastructure/repositories/prisma/tasks.repository';

export const tasksRepositoryProvider: Provider = {
  provide: ITasksRepository,
  useClass: TasksPrismaRepository,
};
