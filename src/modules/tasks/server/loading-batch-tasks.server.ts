import { Injectable, Query } from '@nestjs/common';
import { json, LoaderArgs, redirect } from '@remix-run/node';
import { Loader, RemixArgs } from 'nest-remix';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';
import { IDirectoriesRepository } from '~/modules/directories/domain/repositories/directories.repository';
import { IUsersRepository } from '~/modules/users/domain/repositories/users.repository';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';
import { ITasksRepository } from '../domain/repositories/tasks.repository';

@Injectable()
export class LoadingBatchTasksBackend {
  constructor(
    private readonly logger: ILogger,
    private readonly authenticatorManager: AuthenticatorProvider,
    private readonly userRepository: IUsersRepository,
    private readonly tasksRepository: ITasksRepository,
    private readonly directoriesRepository: IDirectoriesRepository,
  ) {}
  @Loader()
  public async load(
    @RemixArgs() { request }: LoaderArgs,
    @Query('directoryId') directoryId: string,
  ) {
    this.logger.debug('Loading batch tasks...');

    const cookieHeader = request.headers.get('Cookie');
    const { id: userId } = await this.authenticatorManager.currentUser(
      cookieHeader,
    );

    const user = await this.userRepository.findById(userId);

    if (user.isLeft()) {
      this.logger.debug(JSON.stringify(user.value));

      return redirect('/sign-in', {
        statusText: 'Unauthorized',
      });
    }

    const directories = await this.directoriesRepository.findByUserId(userId);

    if (directories.isLeft()) {
      this.logger.debug(JSON.stringify(directories.value));

      return redirect('/sign-in', {
        statusText: 'Ooops something went wrong',
      });
    }

    const tasksBy = await this.tasksRepository.findByUserId({
      userId,
      directoryId,
    });

    if (tasksBy.isLeft()) {
      this.logger.debug(JSON.stringify(tasksBy.value));

      return redirect('/sign-in', {
        statusText: 'Ooops something went wrong',
      });
    }

    return json({
      tasks: tasksBy.value,
      directories: directories.value,
    });
  }
}
