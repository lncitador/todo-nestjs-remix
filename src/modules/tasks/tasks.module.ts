import { Module } from '@nestjs/common';
import { tasksRepositoryProvider } from './providers';

@Module({
  providers: [tasksRepositoryProvider],
  exports: [tasksRepositoryProvider],
})
export class TasksModule {}
