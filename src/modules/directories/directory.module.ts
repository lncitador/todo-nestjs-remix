import { Module } from '@nestjs/common';
import { directoriesRepositoryProvider } from './providers';
import { DirectoriesBackend } from './server/directories.server';
import { DirectoryByIdBackend } from './server/directory-by-id.server';

@Module({
  providers: [
    directoriesRepositoryProvider,
    DirectoryByIdBackend,
    DirectoriesBackend,
  ],
  exports: [directoriesRepositoryProvider],
})
export class DirectoryModule {}
