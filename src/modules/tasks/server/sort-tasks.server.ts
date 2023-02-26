import { Injectable } from '@nestjs/common';
import { LoaderArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Params } from '@remix-run/react';
import { Loader, RemixArgs } from 'nest-remix';
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
        throw redirect('/');
      }

      if (!hasValidPath(sortyPage)) {
        throw redirect('/');
      }
    } else {
      if (!isUUIDv4(sortyPage) && !hasValidPath(sortyPage)) {
        throw redirect('/');
      }
    }
  }
}
