import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, json, redirect } from '@remix-run/node';
import { Action, Loader, RemixArgs } from 'nest-remix';
import { StoreSessionState } from '~/app/contexts/store';
import { getStoreSession } from '~/app/utils/store.server';

@Injectable()
export class SetStoreBackend {
  @Action.Post()
  public async create(
    @Body() { useSortBy, useListView, useRememberMe }: StoreSessionState,
    @RemixArgs() { request }: ActionArgs,
  ) {
    const { action, commit } = await getStoreSession(request);

    if (useListView) action.useListView();
    if (useRememberMe) action.useRememberMe(useRememberMe?.email);
    if (useSortBy) action.useSortBy(useSortBy);

    return json(
      { success: true },
      { headers: { 'Set-Cookie': await commit() } },
    );
  }

  @Loader()
  public async notEnabled() {
    return redirect('/', { status: 404 });
  }
}
