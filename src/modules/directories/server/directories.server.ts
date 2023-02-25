import { Body, Injectable } from '@nestjs/common';
import { LoaderArgs } from '@remix-run/node';
import { Action, RemixArgs } from 'nest-remix';
import { DirectoryDto } from '~/libs/zod';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';
import { IDirectoriesRepository } from '../domain/repositories/directories.repository';

@Injectable()
export class DirectoriesBackend {
  constructor(
    private readonly authenticator: AuthenticatorProvider,
    private readonly directoriesRepository: IDirectoriesRepository,
  ) {}

  @Action.Post()
  public async create(
    @Body() { name }: DirectoryDto,
    @RemixArgs() { request }: LoaderArgs,
  ) {
    const cookieHeader = request.headers.get('Cookie');
    const { id: userId } = await this.authenticator.currentUser(cookieHeader);

    const directory = await this.directoriesRepository.create({
      name,
      userId,
    });

    if (directory.isLeft()) {
      return directory.value;
    }

    return directory.value;
  }
}
