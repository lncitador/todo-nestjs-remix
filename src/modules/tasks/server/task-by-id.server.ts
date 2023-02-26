import { Injectable } from '@nestjs/common';
import { LoaderArgs, redirect } from '@remix-run/node';
import { Loader, RemixArgs } from 'nest-remix';
import { typedjson as json } from 'remix-typedjson';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';
import { DirectoryNotFoundError } from '~/modules/directories/domain/errors/directory-not-found.error';
import { IDirectoriesRepository } from '~/modules/directories/domain/repositories/directories.repository';
import { IUsersRepository } from '~/modules/users/domain/repositories/users.repository';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';
import { TaskNotFoundError } from '../domain/errors/task-not-found.error';
import { ITasksRepository } from '../domain/repositories/tasks.repository';

@Injectable()
export class TaskByIdBackend {
  constructor(
    private readonly logger: ILogger,
    private readonly authenticatorManager: AuthenticatorProvider,
    private readonly userRepository: IUsersRepository,
    private readonly tasksRepository: ITasksRepository,
    private readonly directoriesRepository: IDirectoriesRepository,
  ) {}

  @Loader()
  public async load(@RemixArgs() { params, request }: LoaderArgs) {
    this.logger.debug(`TaskByIdBackend.load params: ${params.id}`);

    const cookie = request.headers.get('Cookie');
    const { id: userId } = await this.authenticatorManager.currentUser(cookie);

    const task = await this.tasksRepository.findById<TaskNotFoundError>(
      params.id as string,
    );

    if (task.isLeft()) {
      this.logger.debug(JSON.stringify(task.value));

      throw redirect('/', {
        statusText: task.value.message,
      });
    }

    const directories = await this.directoriesRepository.findByUserId(userId);

    if (directories.isLeft()) {
      this.logger.debug(JSON.stringify(directories.value));

      throw redirect('/', {
        statusText: directories.value.message,
      });
    }

    return json({
      task: task.value,
      directories: directories.value,
    });
  }
}
