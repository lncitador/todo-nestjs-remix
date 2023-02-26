import { Injectable, Query } from '@nestjs/common';
import { LoaderArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Loader, RemixArgs } from 'nest-remix';
import { SortValue } from '~/app/utils/sort-list';
import { AuthenticatorProvider } from '~/modules/authenticator/domain/providers/authenticator.provider';
import { ILogger } from '~/shared/domain/interfaces/logger.interface';
import { ITasksRepository } from '../domain/repositories/tasks.repository';

@Injectable()
export class AllTasksBackend {
  constructor(
    private readonly logger: ILogger,
    private readonly authenticatorManager: AuthenticatorProvider,
    private readonly tasksRepository: ITasksRepository,
  ) {}

  @Loader()
  public async load(
    @RemixArgs() { request }: LoaderArgs,
    @Query('directoryId') directoryId: string,
    @Query('sort') sort: SortValue = 'order-added',
    @Query('q') q: string,
  ) {
    this.logger.debug('Loading all tasks...');

    const cookieHeader = request.headers.get('Cookie');
    const { id: userId } = await this.authenticatorManager.currentUser(
      cookieHeader,
    );

    const tasksBy = await this.tasksRepository.findByUserId({
      userId,
      directoryId,
      sort,
      q,
    });

    if (tasksBy.isLeft()) {
      this.logger.debug(JSON.stringify(tasksBy.value));

      throw redirect('/sign-in', {
        statusText: 'Ooops something went wrong',
      });
    }

    return json({
      tasks: tasksBy.value,
    });
  }
}
