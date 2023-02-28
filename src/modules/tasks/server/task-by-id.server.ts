import { Body, Injectable } from '@nestjs/common';
import { LoaderArgs, redirect } from '@remix-run/node';
import { Action, Loader, RemixArgs } from 'nest-remix';
import { typedjson as json } from 'remix-typedjson';
import { TodosDto } from '~/libs/zod';
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

  @Action.Put()
  public async update(
    @RemixArgs() { params, request }: LoaderArgs,
    @Body() body: TodosDto,
  ) {
    this.logger.debug(`TaskByIdBackend.update params: ${params.id}`);
    this.logger.debug(
      `TaskByIdBackend.update body: ${JSON.stringify(body, null, 2)}`,
    );

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

    if (body.directoryId) {
      const directory =
        await this.directoriesRepository.findById<DirectoryNotFoundError>(
          body.directoryId,
        );

      if (directory.isLeft()) {
        this.logger.debug(JSON.stringify(directory.value));

        throw redirect('/', {
          statusText: directory.value.message,
        });
      }

      if (directory.value.userId !== userId) {
        this.logger.debug(JSON.stringify(directory.value));

        throw redirect('/', {
          statusText: 'The directory does not belong to the user',
        });
      }
    }

    const updatedTask = await this.tasksRepository.update<TaskNotFoundError>(
      params.id as string,
      {
        title: body.title,
        description: body.description,
        dueDate: new Date(body.dueDate),
        directoryId: body.directoryId,
        completed: !!body.completed,
        important: !!body.important,
      },
    );

    if (updatedTask.isLeft()) {
      this.logger.debug(JSON.stringify(updatedTask.value));

      throw redirect('/', {
        statusText: updatedTask.value.message,
      });
    }

    return redirect(`/tasks/${task.value.id}`);
  }
}
