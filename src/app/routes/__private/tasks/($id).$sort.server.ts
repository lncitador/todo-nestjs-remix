import { Injectable } from '@nestjs/common';
import { json, LoaderArgs, redirect } from '@remix-run/node';
import { Params } from '@remix-run/react';
import { Loader, RemixArgs } from 'nest-remix/core.server';
import { isUUIDv4 } from '~/app/utils/isUUIDv4';
import { hasValidPath } from '~/app/utils/links';

@Injectable()
export class SortTasksBackend {
  @Loader()
  public async sortTasks(@RemixArgs() { params }: LoaderArgs) {
    this.validateParams(params);

    const sortyPage = params.sort as string;
    const id = isUUIDv4(sortyPage) ? sortyPage : params.id;

    return json({
      task: {},
      tasks: [],
    });
  }

  private validateParams(params: Params<string>) {
    const sortyPage = params.sort as string;
    const id = params.id;

    if (id) {
      if (!isUUIDv4(id)) {
        throw redirect('/tasks');
      }

      if (!hasValidPath(sortyPage)) {
        console.log('sortyPage', sortyPage);
        throw redirect('/tasks');
      }
    } else {
      if (!isUUIDv4(sortyPage) && !hasValidPath(sortyPage)) {
        throw redirect('/tasks');
      }
    }
  }
}
