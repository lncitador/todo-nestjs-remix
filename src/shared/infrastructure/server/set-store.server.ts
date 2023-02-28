import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, json, redirect } from '@remix-run/node';
import { Action, Loader, RemixArgs } from 'nest-remix';
import {
  StoreSessionAction,
  StoreSessionState,
} from '~/shared/domain/interfaces/store.interface';
import { Maybe } from '~/shared/domain/logic';
import { storage } from '../cookies/store.storage';

interface Store {
  state: StoreSessionState;
  action: StoreSessionAction;
  commit: () => Promise<string>;
}

@Injectable()
export class SetStoreBackend {
  @Action.Post()
  public async create(
    @Body() { useSortBy, useListView, useRememberMe }: StoreSessionState,
    @RemixArgs() { request }: ActionArgs,
  ) {
    const { action, commit } = await SetStoreBackend.getSession(
      request.headers.get('Cookie'),
    );

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

  public static async getSession(cookieHeader: Maybe<string>): Promise<Store> {
    const session = await storage.getSession(cookieHeader);

    const state: StoreSessionState = {
      useRememberMe: JSON.parse(session.get('rememberMe') || '{}'),
      useSortBy: JSON.parse(session.get('sortBy') || '{}'),
      useListView: session.get('listView'),
    };

    const action: StoreSessionAction = {
      useRememberMe: (email) => session.set('rememberMe', email),
      useSortBy: (sort) => session.set('sortBy', sort),
      useListView: () => {
        return session.set(
          'listView',
          state.useListView === 'grid' ? 'list' : 'grid',
        );
      },
    };

    return {
      state,
      action,
      commit: () => storage.commitSession(session),
    };
  }
}
