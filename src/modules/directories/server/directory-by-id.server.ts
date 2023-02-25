import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, json } from '@remix-run/node';
import { Action, Loader, RemixArgs } from 'nest-remix';
import { DirectoryDto } from '~/libs/zod';
import { DirectoryNotFoundError } from '../domain/errors/directory-not-found.error';
import { IDirectoriesRepository } from '../domain/repositories/directories.repository';

@Injectable()
export class DirectoryByIdBackend {
  constructor(private readonly directoriesRepository: IDirectoriesRepository) {}
  @Action.Put()
  public async update(
    @Body() body: DirectoryDto,
    @RemixArgs() { params }: ActionArgs,
  ) {
    const { directoryId } = params;

    if (!directoryId) {
      throw new Error('Directory id is required');
    }

    const directory =
      await this.directoriesRepository.update<DirectoryNotFoundError>(
        directoryId,
        body,
      );

    if (directory.isLeft()) {
      return directory.value;
    }

    return json({
      directory: directory.value,
    });
  }

  @Action.Delete()
  public async delete(@RemixArgs() { params }: ActionArgs) {
    const { directoryId } = params;

    if (!directoryId) {
      throw new Error('Directory id is required');
    }

    const deleted =
      await this.directoriesRepository.delete<DirectoryNotFoundError>(
        directoryId,
      );

    if (deleted.isLeft()) {
      return deleted.value;
    }

    return json({
      message: 'Directory has been deleted',
    });
  }

  @Loader()
  public async load() {
    return 'DirectoryByIdBackend.load';
  }
}
