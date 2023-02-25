import { Module } from '@nestjs/common';
import { tasksRepositoryProvider } from './providers';
import { LoadingBatchTasksBackend } from './server/loading-batch-tasks.server';
import { SortTasksBackend } from './server/sort-tasks.server';

@Module({
  providers: [
    tasksRepositoryProvider,
    LoadingBatchTasksBackend,
    SortTasksBackend,
  ],
  exports: [tasksRepositoryProvider],
})
export class TasksModule {}
