import { Body, Injectable } from '@nestjs/common';
import { ActionArgs, redirect } from '@remix-run/node';
import { typedjson as json } from 'remix-typedjson';
import { Action, Loader, RemixArgs } from 'nest-remix';
import { isTheme, Theme } from '~/app/contexts/theme';
import { getThemeSession } from '~/app/utils/theme.server';

@Injectable()
export class SetThemeBackend {
  @Action.Post()
  public async setTheme(
    @Body() { theme }: { theme: Theme },
    @RemixArgs() { request }: ActionArgs,
  ) {
    const themeSession = await getThemeSession(request);

    if (!isTheme(theme)) {
      return json({
        success: false,
        message: `theme value of ${theme} is not a valid theme`,
      });
    }

    themeSession.setTheme(theme);
    return json(
      { success: true },
      { headers: { 'Set-Cookie': await themeSession.commit() } },
    );
  }

  @Loader()
  public async notEnabled() {
    return redirect('/', { status: 404 });
  }
}
