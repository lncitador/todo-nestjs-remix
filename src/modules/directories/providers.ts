import { Provider } from '@nestjs/common';
import { IDirectoriesRepository } from './domain/repositories/directories.repository';
import { DirectoriesPrismaRepository } from './infrastructure/repositories/prisma/directories.repository';

export const directoriesRepositoryProvider: Provider = {
  provide: IDirectoriesRepository,
  useClass: DirectoriesPrismaRepository,
};
