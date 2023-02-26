import { Module } from '@nestjs/common';
import { tasksRepositoryProvider } from './providers';
import { AllTasksBackend } from './server/all-tasks.server';
import { LoadingBatchTasksBackend } from './server/loading-batch-tasks.server';
import { SortTasksBackend } from './server/sort-tasks.server';

@Module({
  providers: [
    tasksRepositoryProvider,
    LoadingBatchTasksBackend,
    SortTasksBackend,
    AllTasksBackend,
  ],
  exports: [tasksRepositoryProvider],
})
export class TasksModule {}
