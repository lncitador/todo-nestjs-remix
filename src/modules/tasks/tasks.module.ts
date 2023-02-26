import { Module } from '@nestjs/common';
import { tasksRepositoryProvider } from './providers';
import { AllTasksBackend } from './server/all-tasks.server';
import { LoadingBatchTasksBackend } from './server/loading-batch-tasks.server';
import { NavTasksBackend } from './server/nav-tasks.server';

@Module({
  providers: [
    tasksRepositoryProvider,
    LoadingBatchTasksBackend,
    NavTasksBackend,
    AllTasksBackend,
  ],
  exports: [tasksRepositoryProvider],
})
export class TasksModule {}
