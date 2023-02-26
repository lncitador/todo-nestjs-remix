import { Injectable, Query } from '@nestjs/common';
import { LoaderArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Params } from '@remix-run/react';
import { Loader, RemixArgs } from 'nest-remix';
import { isUUIDv4 } from '~/app/utils/isUUIDv4';
import { hasValidPath, NavValue } from '~/app/utils/links';
import { SortValue } from '~/app/utils/sort-list';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';
import { ITasksRepository } from '../domain/repositories/tasks.repository';
import { TaskNotFoundError } from '../domain/errors/task-not-found.error';

@Injectable()
export class NavTasksBackend {
  constructor(
    private readonly logger: ILogger,
    private readonly authenticatorManager: AuthenticatorProvider,
    private readonly tasksRepository: ITasksRepository,
  ) {}

  @Loader()
  public async sortTasks(
    @RemixArgs() { params, request }: LoaderArgs,
    @Query('directoryId') directoryId: string,
    @Query('sort') sort: SortValue = 'order-added',
    @Query('q') q: string,
  ) {
    this.logger.debug('Sorting tasks...');
    this.validateParams(params);

    const cookieHeader = request.headers.get('Cookie');
    const { id: userId } = await this.authenticatorManager.currentUser(
      cookieHeader,
    );

    const navPage = params.nav as NavValue;
    const id = isUUIDv4(navPage) ? navPage : params.id;

    if (id) {
      const task = await this.tasksRepository.findById<TaskNotFoundError>(id);

      if (task.isLeft()) {
        this.logger.debug(JSON.stringify(task.value));

        throw redirect('/sign-in', {
          statusText: 'Ooops something went wrong',
        });
      }

      if (task.value.userId !== userId) {
        throw redirect('/', {
          statusText: 'This task does not belong to you',
        });
      }

      return json({
        task: task.value,
        tasks: null,
      });
    }

    let tasksBy;

    switch (navPage) {
      case 'today':
        tasksBy = await this.tasksRepository.findByUserIdToday({
          userId,
          directoryId,
          sort,
          q,
        });
        break;
      case 'important':
        tasksBy = await this.tasksRepository.findByUserIdImportant({
          userId,
          directoryId,
          sort,
          q,
        });
        break;
      case 'completed':
        tasksBy = await this.tasksRepository.findByUserIdCompleted({
          userId,
          directoryId,
          sort,
          q,
        });
        break;
      case 'uncompleted':
        tasksBy = await this.tasksRepository.findByUserIdUncompleted({
          userId,
          directoryId,
          sort,
          q,
        });
        break;
    }

    if (tasksBy.isLeft()) {
      this.logger.debug(JSON.stringify(tasksBy.value));

      throw redirect('/', {
        statusText: 'Ooops something went wrong',
        status: 500,
      });
    }

    return json({
      task: null,
      tasks: tasksBy.value,
    });
  }

  private validateParams(params: Params<string>) {
    const navPage = params.nav as string;
    const id = params.id;

    if (id) {
      if (!isUUIDv4(id)) {
        throw redirect('/');
      }

      if (!hasValidPath(navPage)) {
        throw redirect('/');
      }
    } else {
      if (!isUUIDv4(navPage) && !hasValidPath(navPage)) {
        throw redirect('/');
      }
    }
  }
}
