import { Module } from '@nestjs/common';
import { usersRepositoryProvider } from './providers';

@Module({
  providers: [usersRepositoryProvider],
  exports: [usersRepositoryProvider],
})
export class UsersModule {}
