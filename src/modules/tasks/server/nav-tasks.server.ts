import { Body, Injectable, Query } from '@nestjs/common';
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Params } from '@remix-run/react';
import { Action, Loader, RemixArgs } from 'nest-remix';
import { isUUIDv4 } from '~/app/utils/isUUIDv4';
import { hasValidPath, NavValue } from '~/app/utils/links';
import { SortValue } from '~/app/utils/sort-list';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';
import { ITasksRepository } from '../domain/repositories/tasks.repository';
import { TaskNotFoundError } from '../domain/errors/task-not-found.error';
import { TodosDto } from '~/libs/zod';
import { TaskEntity } from '../domain/entities/task.entity';

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

  @Action.Patch()
  public async updateTask(
    @RemixArgs() { params, request }: ActionArgs,
    @Body() body: { action: 'completed' | 'important' | 'delete' },
  ) {
    this.logger.debug('Updating task...');

    const cookieHeader = request.headers.get('Cookie');
    const { id: userId } = await this.authenticatorManager.currentUser(
      cookieHeader,
    );

    const id = isUUIDv4(params.nav as string) ? params.nav : params.id;

    const task = await this.tasksRepository.findById<TaskNotFoundError>(
      id as string,
    );

    if (task.isLeft()) {
      this.logger.debug(JSON.stringify(task.value));

      throw redirect('/', {
        statusText: 'Ooops something went wrong',
      });
    }

    if (task.value.userId !== userId) {
      throw redirect('/', {
        statusText: 'This task does not belong to you',
      });
    }

    switch (body.action) {
      case 'completed':
        await this.tasksRepository.update(task.value.id, {
          completed: !task.value.completed,
        });
        break;
      case 'important':
        await this.tasksRepository.update(task.value.id, {
          important: !task.value.important,
        });
        break;
      case 'delete':
        await this.tasksRepository.delete(task.value.id);
        break;
    }

    return json({ status: 'ok' });
  }

  @Action.Post()
  public async createTask(
    @RemixArgs() { params, request }: ActionArgs,
    @Body() body: TodosDto,
  ) {
    this.logger.debug('Creating task...');
    this.validateParams(params);

    const cookieHeader = request.headers.get('Cookie');
    const { id: userId } = await this.authenticatorManager.currentUser(
      cookieHeader,
    );

    const task = TaskEntity.create({
      title: body.title,
      description: body.description,
      directoryId: body.directoryId,
      completed: !!body.completed,
      important: !!body.important,
      dueDate: new Date(body.dueDate),
      userId,
    });

    if (task.isLeft()) {
      this.logger.debug(JSON.stringify(task.value));

      throw redirect('/', {
        statusText: 'Ooops something went wrong',
      });
    }

    // const teste = await task.value.save(this.tasksRepository);
    await this.tasksRepository.create(task.value);

    return redirect('/', {
      statusText: 'Task created successfully',
    });
  }

  private validateParams(params: Params<string>) {
    const navPage = params.nav as string;
    const id = params.id;

    if (id) {
      if (!isUUIDv4(id) && id !== 'tasks') {
        throw redirect('/', {
          statusText: 'Ooops something went wrong',
        });
      }

      if (!hasValidPath(navPage) && id !== 'tasks') {
        throw redirect('/', {
          statusText: 'Ooops something went wrong',
        });
      }
    } else {
      if (!isUUIDv4(navPage) && !hasValidPath(navPage) && navPage !== 'tasks') {
        throw redirect('/', {
          statusText: 'Ooops something went wrong',
        });
      }
    }
  }
}
