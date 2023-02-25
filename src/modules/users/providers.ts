import { Provider } from '@nestjs/common';
import { IUsersRepository } from './domain/repositories/users.repository';
import { UsersPrismaRepository } from './infrastructure/repositories/prisma/users.repository';

export const usersRepositoryProvider: Provider = {
  provide: IUsersRepository,
  useClass: UsersPrismaRepository,
};
